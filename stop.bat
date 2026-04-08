@echo off
echo ==========================================
echo    DevOps Mastery - Stop All Services
echo ==========================================

echo.
echo [1/2] Stopping Node.js processes (Backend + Frontend)...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo       All Node.js processes stopped.
) else (
    echo       No running Node.js processes found.
)

echo.
echo [2/2] Stopping any playground Docker containers...
for /f "tokens=*" %%i in ('docker ps -q --filter "ancestor=devops-playground:latest" 2^>nul') do (
    docker stop %%i >nul 2>&1
    echo       Stopped container %%i
)

echo.
echo ==========================================
echo    All services stopped.
echo ==========================================
pause
