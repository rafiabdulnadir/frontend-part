@echo off
echo 🚀 SkillNet Backend Setup Script
echo =================================

REM Check if .NET 8 is installed
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ .NET 8.0 SDK is not installed. Please install it from:
    echo    https://dotnet.microsoft.com/download/dotnet/8.0
    pause
    exit /b 1
)

echo ✅ .NET SDK found
dotnet --version

REM Check if EF Core tools are installed
dotnet tool list -g | findstr "dotnet-ef" >nul
if %errorlevel% neq 0 (
    echo 📦 Installing Entity Framework Core tools...
    dotnet tool install --global dotnet-ef
) else (
    echo ✅ Entity Framework Core tools already installed
)

REM Restore NuGet packages
echo 📦 Restoring NuGet packages...
dotnet restore

REM Create database and apply migrations
echo 🗄️ Setting up database...
dotnet ef database update

if %errorlevel% equ 0 (
    echo ✅ Database setup completed successfully!
) else (
    echo ❌ Database setup failed. Please check your connection string in appsettings.json
    pause
    exit /b 1
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo To start the application, run:
echo    dotnet run
echo.
echo Then visit:
echo    🌐 Swagger UI: https://localhost:7000
echo    📡 API Base:   https://localhost:7000/api
echo.
echo Happy coding! 🚀
pause

