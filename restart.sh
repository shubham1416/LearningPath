#!/bin/bash

echo "=========================================="
echo "   DevOps Mastery - Restart All Services  "
echo "=========================================="

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "[1/3] Stopping existing services..."
pkill -f "node backend/server.js" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2
echo "      Stopped all Node.js processes."

echo ""
echo "[2/3] Starting Backend (Port 3001)..."
node "$SCRIPT_DIR/backend/server.js" &
BACKEND_PID=$!
trap "kill $BACKEND_PID 2>/dev/null" EXIT
sleep 2

echo ""
echo "[3/3] Starting Frontend (Port 5173)..."
echo "=========================================="
echo "   Services restarted!"
echo "   Backend:  http://localhost:3001"
echo "   Frontend: http://localhost:5173"
echo "=========================================="
cd "$SCRIPT_DIR"
npm run dev
