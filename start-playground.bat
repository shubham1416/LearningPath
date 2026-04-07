@echo off
echo ==========================================
echo    DevOps Mastery Playground Starter
echo ==========================================

echo [1/3] Building the Isolated Playground Image...
docker build -t devops-playground infra/

if %errorlevel% neq 0 (
    echo [ERROR] Docker build failed. Is Docker Desktop running?
    pause
    exit /b
)

echo [2/3] Starting Playground Backend (Port 3001)...
start "Playground Backend" cmd /c "node backend/server.js"

echo [3/3] Starting Management Frontend (Vite)...
npm run dev

echo ==========================================
echo Playground is LIVE at http://localhost:5173/playground
echo ==========================================
pause
