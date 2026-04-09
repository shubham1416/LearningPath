# DevOps Learning Path Monorepo

Welcome to the restructured DevOps Learning Path project. This repository follows an industry-standard monorepo structure using NPM Workspaces.

## Project Structure

- **`/client`**: The frontend React/Vite application.
- **`/server`**: The backend Node.js/Express application.
- **`/infra`**: Shared infrastructure and Docker playground definitions.

## Getting Started

1. **Install Dependencies** (from root):
   ```bash
   npm install
   ```

2. **Start Development Servers**:
   ```bash
   ./start.sh
   # OR
   npm run dev
   ```

3. **Build everything**:
   ```bash
   npm run build
   ```

## Key Configurations

- **Port**: The server listens on `process.env.PORT || 8080`.
- **Environment Variables**: Managed per-service (e.g., `server/.env`).
- **Workspaces**: Orchestrated from the root `package.json`.

---
Happy Learning!
