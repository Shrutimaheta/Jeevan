@echo off
REM Starts the Django dev server using the repo-level virtualenv (Jeevan\.venv)
cd /d "%~dp0.."
"..\.venv\Scripts\python.exe" manage.py runserver 127.0.0.1:8000
