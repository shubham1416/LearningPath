@echo off
echo ==========================================
echo    DevOps Mastery - Restart All Services
echo ==========================================

echo.
echo [1/3] Stopping existing services...
taskkill /F /IM node.exe >nul 2>&1
echo       Stopped all Node.js processes.
timeout /t 2 >nul

echo.
echo [2/3] Starting Backend (Port 3001)...
start "Playground Backend" cmd /c "cd /d %~dp0backend && node server.js"
timeout /t 2 >nul

echo.
echo [3/3] Starting Frontend (Port 5173)...
echo ==========================================
echo    Services restarted!
echo    Backend:  http://localhost:3001
echo    Frontend: http://localhost:5173
echo ==========================================
cd /d %~dp0
npm run dev

pause
