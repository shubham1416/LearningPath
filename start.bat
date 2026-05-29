@echo off
echo ==========================================
echo    DevOps Mastery Playground Starter
echo ==========================================

echo [1/3] Installing All Dependencies (Root Workspace)...
call npm install

if %errorlevel% neq 0 (
    echo [ERROR] npm install failed.
    pause
    exit /b
)

echo.
echo [2/3] Starting Backend Server (Port 8080)...
start "Backend Server" cmd /k "cd /d "%~dp0" && node server/server.js"

echo.
echo [3/3] Starting Frontend Dev Server (Port 5173)...
start "Frontend Dev" cmd /k "cd /d "%~dp0" && npm run dev --workspace=client"

echo.
echo ==========================================
echo  All services starting...
echo.
echo  Frontend  :  http://localhost:5173
echo  Backend   :  http://localhost:8080
echo ==========================================
echo.
echo  Two new windows have been opened:
echo   - "Backend Server"  (Express + API)
echo   - "Frontend Dev"    (Vite dev server)
echo.
echo  Close those windows to stop the services,
echo  or run stop.bat.
echo ==========================================

pause
