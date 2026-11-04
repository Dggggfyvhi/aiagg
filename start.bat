@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo  new-api 前端壳 - 本地启动
echo ============================================
echo.
echo 正在启动本地服务，请不要关闭这个窗口。
echo 启动后浏览器会自动打开 http://127.0.0.1:8899
echo 看完页面后，直接关掉本窗口即可停止。
echo.

start "" http://127.0.0.1:8899
python -m http.server 8899 2>nul
if errorlevel 1 (
  echo.
  echo 没检测到 python，改用 py 命令再试一次...
  py -m http.server 8899
)
if errorlevel 1 (
  echo.
  echo ============================================
  echo  启动失败：这台电脑好像没装 Python。
  echo  两个办法：
  echo   1. 装一个 Python（python.org），然后重新双击本文件
  echo   2. 用 VS Code 打开本文件夹，装 Live Server 插件，
  echo      右键 index.html - Open with Live Server
  echo ============================================
  pause
)
