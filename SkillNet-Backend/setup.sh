#!/bin/bash

echo "🚀 SkillNet Backend Setup Script"
echo "================================="

# Check if .NET 8 is installed
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET 8.0 SDK is not installed. Please install it from:"
    echo "   https://dotnet.microsoft.com/download/dotnet/8.0"
    exit 1
fi

echo "✅ .NET SDK found: $(dotnet --version)"

# Check if EF Core tools are installed
if ! dotnet tool list -g | grep -q "dotnet-ef"; then
    echo "📦 Installing Entity Framework Core tools..."
    dotnet tool install --global dotnet-ef
else
    echo "✅ Entity Framework Core tools already installed"
fi

# Restore NuGet packages
echo "📦 Restoring NuGet packages..."
dotnet restore

# Create database and apply migrations
echo "🗄️ Setting up database..."
dotnet ef database update

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed successfully!"
else
    echo "❌ Database setup failed. Please check your connection string in appsettings.json"
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "To start the application, run:"
echo "   dotnet run"
echo ""
echo "Then visit:"
echo "   🌐 Swagger UI: https://localhost:7000"
echo "   📡 API Base:   https://localhost:7000/api"
echo ""
echo "Happy coding! 🚀"

