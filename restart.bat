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
echo [2/3] Starting Backend (Port 8080)...
start "Playground Backend" cmd /c "cd /d %~dp0server && node server.js"
timeout /t 2 >nul

echo.
echo [3/3] Starting Frontend (Dev Server)...
echo ==========================================
echo    Services restarted!
echo    Backend:  http://localhost:8080
echo    Frontend dev: will open automatically
echo ==========================================
cd /d %~dp0
call npm run dev

pause
