@echo off
setlocal
set "PROJECT=Q:\Codex\Portfolio webv.01"
set "NODE=C:\Users\guany\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%NODE%" set "NODE=node"
start "Funnyboy Portfolio Studio" /b "%NODE%" "%PROJECT%\admin-server.js" > "%PROJECT%\admin-server.log" 2>&1
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:4184/admin/"
endlocal
