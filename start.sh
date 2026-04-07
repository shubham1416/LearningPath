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

# 2. Install Frontend Dependencies
echo ""
echo "[1/4] Installing Frontend Dependencies..."
npm install

# 3. Install Backend Dependencies
echo ""
echo "[2/4] Installing Backend Dependencies..."
cd backend
npm install
cd ..

# 4. Build the Isolated Playground Docker Image
echo ""
echo "[3/4] Building the Isolated Playground Image..."
docker build -t devops-playground infra/

if [ $? -ne 0 ]; then
    echo "[ERROR] Docker build failed. Is the Docker daemon running?"
    exit 1
fi

# 5. Start the backend server in the background
echo ""
echo "[4/4] Starting Playground Backend (Port 3001)..."
node backend/server.js &
BACKEND_PID=$!

# Ensure backend stops when the script exits
trap "kill $BACKEND_PID" EXIT

# 6. Start the frontend Vite server
echo ""
echo "=========================================="
echo "🚀 Playground is LIVE!"
echo "Starting frontend server..."
echo "=========================================="
npm run dev
