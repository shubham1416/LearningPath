#!/bin/bash

echo "=========================================="
echo "    DevOps Mastery - Stop All Services    "
echo "=========================================="

echo ""
echo "[1/2] Stopping Node.js processes (Backend + Frontend)..."
pkill -f "node backend/server.js" 2>/dev/null
pkill -f "vite" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "      All Node.js processes stopped."
else
    echo "      No running Node.js processes found."
fi

echo ""
echo "[2/2] Stopping any playground Docker containers..."
CONTAINERS=$(docker ps -q --filter "ancestor=devops-playground:latest" 2>/dev/null)
if [ -n "$CONTAINERS" ]; then
    docker stop $CONTAINERS
    echo "      Stopped playground containers."
else
    echo "      No playground containers running."
fi

echo ""
echo "=========================================="
echo "   All services stopped."
echo "=========================================="
