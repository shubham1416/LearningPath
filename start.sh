#!/bin/bash

echo "=========================================="
echo "    DevOps Mastery Playground Starter     "
echo "=========================================="

# 1. Check for Docker
if ! command -v docker &> /dev/null; then
    echo "[ERROR] Docker is not installed or not running."
    echo "Please install Docker Desktop and start it before running this script."
    exit 1
fi

# 2. Install Dependencies
echo ""
echo "[1/4] Installing All Dependencies..."
npm install

# 3. Build the Isolated Playground Docker Image
echo ""
echo "[2/4] Building the Isolated Playground Image..."
docker build -t devops-playground infra/

if [ $? -ne 0 ]; then
    echo "[ERROR] Docker build failed. Is the Docker daemon running?"
    exit 1
fi

# 4. Build Frontend
echo ""
echo "[3/4] Building Frontend..."
npm run build --workspace=client

# 5. Start the backend server in the background
echo ""
echo "[4/4] Starting Playground Backend (Port 8080)..."
node server/server.js &
BACKEND_PID=$!

# Ensure backend stops when the script exits
trap "kill $BACKEND_PID" EXIT

echo ""
echo "=========================================="
echo "🚀 Playground is LIVE!"
echo "Backend is running (with static frontend) at http://localhost:8080"
echo "=========================================="

# Keep script running to maintain the background process
wait $BACKEND_PID

