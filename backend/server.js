import express from 'express';
import { WebSocketServer } from 'ws';
import Docker from 'dockerode';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

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

// AI Mentor Endpoint — with retry + fallback model
const MODELS = ['gemini-2.0-flash'];
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

async function callGeminiWithRetry(ai, contents, systemInstruction) {
  let lastError = null;
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Trying model: ${model} (attempt ${attempt}/${MAX_RETRIES})`);
        const response = await ai.models.generateContent({
          model,
          contents,
          config: { systemInstruction, temperature: 0.7 }
        });
        return response.text;
      } catch (err) {
        lastError = err;
        const status = err?.status || err?.code || '';
        console.warn(`Model ${model} attempt ${attempt} failed: ${err.message || err}`);
        // Only retry on 503/429 (overloaded / rate-limited)
        if (status === 503 || status === 429 || /UNAVAILABLE|RESOURCE_EXHAUSTED|overloaded/i.test(err.message || '')) {
          if (attempt < MAX_RETRIES) {
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS * attempt));
            continue;
          }
        }
        break; // non-retryable error, try next model
      }
    }
  }
  throw lastError;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, toolName, mode, history, difficulty } = req.body;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Construct System Prompt based on mode
    let systemInstruction = '';
    if (mode === 'quiz') {
      const difficultyContext = difficulty ? `The difficulty level is ${difficulty.toUpperCase()}. Tailor your question strictly to this level.` : '';
      systemInstruction = `You are an expert DevOps interviewer. The user wants to test their knowledge on the tool: ${toolName}. ${difficultyContext} Ask them an open-ended question about ${toolName} matching this difficulty. When they answer, critically evaluate it, point out any mistakes, and then ask the NEXT question. Keep responses short and directly focused on the technical concepts.`;
    } else {
      systemInstruction = `You are a patient expert DevOps mentor. The user is stuck while learning the tool: ${toolName}. Help them understand where they are stuck step-by-step. Break down complex concepts simply. Format terminal commands and code precisely with markdown.`;
    }

    // Format history
    const contents = history ? history.map(h => ({
      role: h.role === 'ai' ? 'model' : 'user',
      parts: [{ text: h.content }]
    })) : [];

    const userMsg = message && message.trim() ? message : `Generate a ${difficulty || 'easy'} level quiz question about ${toolName}`;
    contents.push({ role: 'user', parts: [{ text: userMsg }] });

    const text = await callGeminiWithRetry(ai, contents, systemInstruction);
    res.json({ text });

  } catch (error) {
    console.error('AI Error:', error.message || error);
    const isOverloaded = /UNAVAILABLE|503|overloaded|high demand/i.test(error.message || '');
    const errMsg = isOverloaded
      ? 'All Gemini models are currently overloaded. Please wait a minute and try again.'
      : `AI Error: ${error.message || 'Unknown error'}`;
    res.status(isOverloaded ? 503 : 500).json({ error: errMsg });
  }
});

server.listen(PORT, () => {
  console.log(`Playground Backend listening on http://localhost:${PORT}`);
  checkImage();
});
