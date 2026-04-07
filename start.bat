@echo off
echo ==========================================
echo    DevOps Mastery Playground Starter
echo ==========================================

echo [1/4] Installing Frontend Dependencies...
call npm install

echo.
echo [2/4] Installing Backend Dependencies...
cd backend
call npm install
cd ..

echo.
echo [3/4] Building the Isolated Playground Image...
docker build -t devops-playground infra/

if %errorlevel% neq 0 (
    echo [ERROR] Docker build failed. Is Docker Desktop running?
    pause
    exit /b
)

echo.
echo [4/4] Starting Playground Backend (Port 3001)...
start "Playground Backend" cmd /c "node backend/server.js"

echo.
echo ==========================================
echo 🚀 Playground is starting up...
echo ==========================================
npm run dev

pause
