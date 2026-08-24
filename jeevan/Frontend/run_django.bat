@echo off
cd /d "%~dp0.."
..\scripts\.venv\Scripts\python.exe manage.py runserver 0.0.0.0:8000
