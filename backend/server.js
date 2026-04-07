import express from 'express';
import { WebSocketServer } from 'ws';
import Docker from 'dockerode';
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors());
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

server.listen(PORT, () => {
  console.log(`Playground Backend listening on http://localhost:${PORT}`);
  checkImage();
});
