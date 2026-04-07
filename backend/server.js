import express from 'express';
import { WebSocketServer } from 'ws';
import Docker from 'dockerode';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Allow JSON body parsing
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
// On Windows with Docker Desktop, connect to the active desktop-linux context pipe
const docker = new Docker({ socketPath: '//./pipe/dockerDesktopLinuxEngine' });

const PORT = 3001;
const PLAYGROUND_IMAGE = 'devops-playground:latest'; // Custom image built from infra/Dockerfile

// Verify local image exists (devops-playground is built locally, not on Docker Hub)
async function checkImage() {
  console.log(`Checking for local image: ${PLAYGROUND_IMAGE}...`);
  try {
    const images = await docker.listImages({ filters: { reference: [PLAYGROUND_IMAGE] } });
    if (images.length > 0) {
      console.log(`✅ Image found: ${PLAYGROUND_IMAGE}`);
    } else {
      console.error(`❌ Image NOT found: ${PLAYGROUND_IMAGE}`);
      console.error('   Run: docker build -t devops-playground infra/');
    }
  } catch (err) {
    console.error('Error connecting to Docker:', err.message);
  }
}

wss.on('connection', async (ws) => {
  console.log('New playground session requested...');

  let container;

  try {
    // 1. Create a fresh, isolated container for the user
    container = await docker.createContainer({
      Image: PLAYGROUND_IMAGE,
      Tty: true,
      Cmd: ['/bin/bash'],
      OpenStdin: true,
      StdinOnce: false,
      HostConfig: {
        AutoRemove: true,
        Memory: 512 * 1024 * 1024, // 512MB limit
        CpuPeriod: 100000,
        CpuQuota: 50000, // 0.5 CPU limit
        // Mount Docker socket so `docker` CLI commands work inside the playground
        Binds: ['/var/run/docker.sock:/var/run/docker.sock'],
      }
    });

    // 2. Start it
    await container.start();
    console.log(`Container started: ${container.id.substring(0, 10)}`);

    // 3. Attach to the TTY stream
    const stream = await container.attach({
      stream: true,
      stdin: true,
      stdout: true,
      stderr: true,
      hijack: true
    });

    // 4. Bridge WebSocket <-> Container Stream
    // Data from browser -> Container
    ws.on('message', (msg) => {
      stream.write(msg);
    });

    // Data from container -> Browser
    stream.on('data', (chunk) => {
      ws.send(chunk);
    });

    // Clean up on disconnect
    ws.on('close', async () => {
      console.log('Session ended. Cleaning up container...');
      try {
        await container.stop();
      } catch (e) {
        // Container might already be gone (AutoRemove: true)
      }
    });

    container.wait().then(() => {
        console.log('Container exited.');
        ws.close();
    });

  } catch (err) {
    console.error('Failed to spawn playground:', err);
    ws.send('\r\n\x1b[31m[Error]\x1b[0m Failed to spawn isolated container. Is Docker running?\r\n');
    ws.close();
  }
});

// AI Mentor Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, toolName, mode, history } = req.body;
    
    // Initialize AI client
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Construct System Prompt based on mode
    let systemInstruction = '';
    if (mode === 'quiz') {
      systemInstruction = `You are an expert DevOps interviewer. The user wants to test their knowledge on the tool: ${toolName}. Ask them a challenging, open-ended question about ${toolName}. When they answer, critically evaluate it, format code with markdown if needed, and then ask the NEXT question. Keep responses short and directly focused on the technical concepts.`;
    } else {
      systemInstruction = `You are a patient expert DevOps mentor. The user is stuck while learning the tool: ${toolName}. Help them understand where they are stuck step-by-step. Break down complex concepts simply. Format terminal commands and code precisely with markdown.`;
    }

    // Format history for Gemini API. 
    // Usually it accepts an array of {role, parts:[{text}]}. In @google/genai we can pass an array of contents.
    const contents = history ? history.map(h => ({
      role: h.role === 'ai' ? 'model' : 'user',
      parts: [{ text: h.content }]
    })) : [];
    
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7
      }
    });

    res.json({ text: response.text });

  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Failed to communicate with AI Mentor. Did you set GEMINI_API_KEY in the backend/.env?' });
  }
});

server.listen(PORT, () => {
  console.log(`Playground Backend listening on http://localhost:${PORT}`);
  checkImage();
});
