#!/bin/bash

echo "=========================================="
echo "   DevOps Mastery - Restart All Services  "
echo "=========================================="

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "[1/3] Stopping existing services..."
pkill -f "node server/server.js" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2
echo "      Stopped all Node.js processes."

echo ""
echo "[2/3] Starting Backend (Port 8080)..."
node "$SCRIPT_DIR/server/server.js" &
BACKEND_PID=$!
trap "kill $BACKEND_PID 2>/dev/null" EXIT
sleep 2

echo ""
echo "[3/3] Building and Starting Services..."
echo "=========================================="
echo "   Services restarted!"
echo "   App (Dual-Stack): http://localhost:8080"
echo "=========================================="
cd "$SCRIPT_DIR"
npm run dev
