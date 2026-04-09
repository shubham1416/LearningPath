@echo off
echo ==========================================
echo    DevOps Mastery Playground Starter
echo ==========================================

echo [1/4] Installing All Dependencies (Root Workspace)...
call npm install

echo.
echo [2/4] Building Frontend...
call npm run build --workspace=client

echo.
echo [3/4] Building the Isolated Playground Image...
docker build -t devops-playground infra/

if %errorlevel% neq 0 (
    echo [ERROR] Docker build failed. Is Docker Desktop running?
    pause
    exit /b
)

echo.
echo [4/4] Starting Playground Backend (Port 8080)...
start "Playground Backend" cmd /c "node server/server.js"

echo.
echo ==========================================
echo 🚀 Playground is LIVE at http://localhost:8080
echo ==========================================


pause
