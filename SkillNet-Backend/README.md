# SkillNet Backend API - ASP.NET Core 8.0

A comprehensive backend API for the SkillNet skill-sharing platform, built with ASP.NET Core 8.0 using modern conventions and best practices.

## 🚀 Quick Start

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (LocalDB is fine for development)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)

### 🏃‍♂️ Run Locally (3 Simple Steps)

1. **Clone and Navigate**
   ```bash
   git clone <your-repo-url>
   cd SkillNet-Backend
   ```

2. **Setup Database**
   ```bash
   # Install EF Core tools (if not already installed)
   dotnet tool install --global dotnet-ef
   
   # Create and apply database migrations
   dotnet ef database update
   ```

3. **Run the Application**
   ```bash
   dotnet run
   ```

🎉 **That's it!** Your API will be running at:
- **Swagger UI**: https://localhost:7000
- **API Base URL**: https://localhost:7000/api

## 📁 Project Structure

```
SkillNet-Backend/
├── 📁 Controllers/           # REST API Endpoints (4 files)
│   ├── AuthController.cs        # Authentication (register, login, refresh)
│   ├── UsersController.cs       # User management & profiles
│   ├── ProjectsController.cs    # Project CRUD operations
│   └── FeedbackController.cs    # Feedback submission
│
├── 📁 Models/               # Database Entities (7 files)
│   ├── User.cs                  # User entity (extends IdentityUser)
│   ├── UserSkill.cs             # User skills with proficiency levels
│   ├── Project.cs               # Project entity with categorization
│   ├── Conversation.cs          # Chat conversations
│   ├── Message.cs               # Chat messages
│   ├── Feedback.cs              # User feedback entity
│   └── ProfileView.cs           # Profile view analytics
│
├── 📁 DTOs/                 # Data Transfer Objects (4 files)
│   ├── Auth/AuthDto.cs          # Authentication DTOs
│   ├── User/UserDto.cs          # User profile & skill DTOs
│   ├── Project/ProjectDto.cs    # Project CRUD & filter DTOs
│   └── Feedback/FeedbackDto.cs  # Feedback submission DTO
│
├── 📁 Services/             # Business Logic Layer (6 files)
│   ├── IAuthService.cs          # Authentication service interface
│   ├── AuthService.cs           # JWT authentication implementation
│   ├── IUserService.cs          # User service interface
│   ├── UserService.cs           # User business logic
│   ├── IProjectService.cs       # Project service interface
│   └── ProjectService.cs        # Project business logic
│
├── 📁 Repositories/         # Data Access Layer (8 files)
│   ├── IGenericRepository.cs    # Generic repository interface
│   ├── GenericRepository.cs     # Generic repository implementation
│   ├── IUserRepository.cs       # User repository interface
│   ├── UserRepository.cs        # User data access
│   ├── IProjectRepository.cs    # Project repository interface
│   ├── ProjectRepository.cs     # Project data access
│   ├── IMessageRepository.cs    # Message repository interface
│   └── MessageRepository.cs     # Message data access
│
├── 📁 Data/                 # Database Context (1 file)
│   └── ApplicationDbContext.cs  # EF Core DbContext
│
├── 📁 Migrations/           # Database Migrations (auto-generated)
│
├── 📄 Program.cs            # Application entry point
├── 📄 SkillNet.Api.csproj   # Project configuration
├── 📄 appsettings.json      # Production settings
├── 📄 appsettings.Development.json # Development settings
└── 📄 README.md             # This file
```

## 🔧 Configuration

### Database Connection
The application uses SQL Server LocalDB by default. To use a different database, update the connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=your-server;Database=SkillNetDb;Trusted_Connection=true;"
  }
}
```

### JWT Settings
JWT configuration is in `appsettings.json`. For production, use a secure secret key:

```json
{
  "JwtSettings": {
    "SecretKey": "YourSuperSecretKeyThatIsAtLeast32CharactersLong!",
    "Issuer": "SkillNet.Api",
    "Audience": "SkillNet.Client",
    "ExpirationInMinutes": 60
  }
}
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/revoke` - Revoke refresh token

### Users
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/{userId}` - Get user profile by ID
- `PUT /api/users/profile` - Update current user profile
- `GET /api/users/search` - Search users
- `GET /api/users/by-skill/{skillName}` - Get users by skill
- `POST /api/users/skills` - Add skill to user
- `DELETE /api/users/skills/{skillName}` - Remove skill from user

### Projects
- `GET /api/projects` - Get all projects (with filtering)
- `GET /api/projects/{id}` - Get project by ID
- `GET /api/projects/user/{userId}` - Get projects by user
- `GET /api/projects/my-projects` - Get current user's projects
- `GET /api/projects/search` - Search projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Feedback
- `POST /api/feedback` - Submit feedback

## 🧪 Testing the API

1. **Start the application**: `dotnet run`
2. **Open Swagger UI**: Navigate to https://localhost:7000
3. **Test endpoints**: Use the interactive Swagger interface

### Sample API Calls

#### Register a new user:
```bash
curl -X POST "https://localhost:7000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123"
  }'
```

#### Login:
```bash
curl -X POST "https://localhost:7000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

#### Get projects (with authentication):
```bash
curl -X GET "https://localhost:7000/api/projects" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🏗️ Architecture

### Clean Architecture
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Handle data access
- **Models**: Define database entities
- **DTOs**: Define API contracts

### Key Features
- **Repository Pattern**: Abstraction over data access
- **Dependency Injection**: Loose coupling between components
- **JWT Authentication**: Stateless authentication
- **Entity Framework Core**: ORM for database operations
- **Swagger/OpenAPI**: API documentation

## 🔒 Security Features

- **JWT Bearer Authentication**: Secure token-based authentication
- **ASP.NET Core Identity**: User management and password hashing
- **Input Validation**: Comprehensive validation using Data Annotations
- **CORS Configuration**: Secure cross-origin requests
- **SQL Injection Protection**: Parameterized queries via EF Core

## 📦 NuGet Packages

The project includes these key packages:
- `Microsoft.AspNetCore.Authentication.JwtBearer` - JWT authentication
- `Microsoft.AspNetCore.Identity.EntityFrameworkCore` - Identity framework
- `Microsoft.EntityFrameworkCore.SqlServer` - SQL Server provider
- `Microsoft.EntityFrameworkCore.Tools` - EF Core tools
- `Swashbuckle.AspNetCore` - Swagger/OpenAPI

## 🚀 Deployment

### Development
```bash
dotnet run --environment Development
```

### Production
1. Update connection strings in `appsettings.json`
2. Set secure JWT secret key
3. Deploy to your preferred hosting platform:
   - Azure App Service
   - AWS Elastic Beanstalk
   - Docker containers
   - IIS

## 🤝 Frontend Integration

This API is designed to work with React, Vue, Angular, or any frontend framework. Example TypeScript interfaces:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  rating: number;
  skills: UserSkill[];
  location?: Location;
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technology: string;
  domain: string;
  techStack: string[];
  githubLink?: string;
  user?: User;
}
```

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the **Swagger UI** for API documentation
2. Review the **console logs** for error messages
3. Ensure your **database connection** is properly configured
4. Verify that **EF Core migrations** have been applied

---

**Happy coding!** 🚀

