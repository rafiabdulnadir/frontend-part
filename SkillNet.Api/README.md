# SkillNet API - ASP.NET Core 8.0 Backend

A comprehensive backend API for the SkillNet skill-sharing platform, built with ASP.NET Core 8.0 using modern conventions and best practices.

## 🏗️ Project Structure

```
SkillNet.Api/
├── Controllers/           # API Controllers
│   ├── AuthController.cs     # Authentication endpoints
│   ├── UsersController.cs    # User management
│   ├── ProjectsController.cs # Project CRUD operations
│   └── FeedbackController.cs # Feedback submission
├── Models/               # Entity Models
│   ├── User.cs              # User entity (extends IdentityUser)
│   ├── UserSkill.cs         # User skills with proficiency
│   ├── Project.cs           # Project entity
│   ├── Conversation.cs      # Chat conversations
│   ├── Message.cs           # Chat messages
│   ├── Feedback.cs          # User feedback
│   └── ProfileView.cs       # Profile view analytics
├── DTOs/                 # Data Transfer Objects
│   ├── Auth/                # Authentication DTOs
│   ├── User/                # User-related DTOs
│   ├── Project/             # Project-related DTOs
│   └── Feedback/            # Feedback DTOs
├── Services/             # Business Logic Layer
│   ├── IAuthService.cs      # Authentication service interface
│   ├── AuthService.cs       # JWT authentication implementation
│   ├── IUserService.cs      # User service interface
│   ├── UserService.cs       # User business logic
│   ├── IProjectService.cs   # Project service interface
│   └── ProjectService.cs    # Project business logic
├── Repositories/         # Data Access Layer
│   ├── IGenericRepository.cs    # Generic repository interface
│   ├── GenericRepository.cs     # Generic repository implementation
│   ├── IUserRepository.cs       # User repository interface
│   ├── UserRepository.cs        # User data access
│   ├── IProjectRepository.cs    # Project repository interface
│   ├── ProjectRepository.cs     # Project data access
│   ├── IMessageRepository.cs    # Message repository interface
│   └── MessageRepository.cs     # Message data access
├── Data/                 # Database Context
│   └── ApplicationDbContext.cs  # EF Core DbContext
├── Migrations/           # EF Core Migrations (auto-generated)
├── Program.cs            # Application entry point
├── appsettings.json      # Configuration
└── SkillNet.Api.csproj   # Project file
```

## 🚀 Features

### Authentication & Authorization
- **JWT-based authentication** with refresh tokens
- **ASP.NET Core Identity** integration
- **Role-based authorization** support
- Secure password policies

### User Management
- User registration and login
- Profile management with skills and location
- Profile view analytics
- User search functionality

### Project Management
- CRUD operations for projects
- Advanced filtering by category, technology, domain
- Project search functionality
- User-specific project management

### Messaging System
- Real-time messaging between users
- Conversation management
- Message read status tracking

### Feedback System
- Comprehensive feedback submission
- Multiple feedback types and urgency levels

## 🛠️ Technology Stack

- **Framework**: ASP.NET Core 8.0
- **Database**: SQL Server with Entity Framework Core 8
- **Authentication**: JWT Bearer tokens
- **Documentation**: Swagger/OpenAPI
- **Architecture**: Repository Pattern + Service Layer

## 📦 NuGet Packages

```xml
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
<PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.4.0" />
```

## ⚙️ Configuration

### Database Connection
Update `appsettings.json` with your SQL Server connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=your-server;Database=SkillNetDb;Trusted_Connection=true;"
  }
}
```

### JWT Settings
Configure JWT authentication in `appsettings.json`:

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

## 🚀 Getting Started

1. **Clone the repository**
2. **Update connection string** in `appsettings.json`
3. **Run database migrations**:
   ```bash
   dotnet ef database update
   ```
4. **Run the application**:
   ```bash
   dotnet run
   ```
5. **Access Swagger UI** at `https://localhost:7000`

## 📋 API Endpoints

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

## 🏛️ Architecture

### Repository Pattern
- **Generic Repository**: Common CRUD operations
- **Specific Repositories**: Entity-specific operations
- **Unit of Work**: Transaction management

### Service Layer
- **Business Logic**: Separated from controllers
- **Data Validation**: Input validation and business rules
- **Error Handling**: Consistent error responses

### DTOs (Data Transfer Objects)
- **API Contracts**: Separate from database models
- **Validation**: Input validation attributes
- **Mapping**: Clean separation of concerns

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: ASP.NET Core Identity
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Comprehensive validation
- **SQL Injection Protection**: EF Core parameterized queries

## 📊 Database Schema

### Core Entities
- **Users**: Extended IdentityUser with profile data
- **UserSkills**: Many-to-many relationship with proficiency levels
- **Projects**: User projects with categorization
- **Conversations**: Chat conversations between users
- **Messages**: Individual chat messages
- **Feedback**: User feedback submissions
- **ProfileViews**: Analytics for profile visits

### Relationships
- User → UserSkills (One-to-Many)
- User → Projects (One-to-Many)
- User → Conversations (Many-to-Many via ConversationParticipants)
- Conversation → Messages (One-to-Many)
- User → ProfileViews (One-to-Many)

## 🧪 Example Usage

### Frontend Integration
The API is designed to work seamlessly with the React frontend:

```typescript
// Login example
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Get projects with filtering
const getProjects = async (filters: ProjectFilters) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/projects?${params}`);
  return response.json();
};
```

## 🔄 Development Workflow

1. **Models First**: Define entity models
2. **Database Migration**: Create and apply migrations
3. **Repository Layer**: Implement data access
4. **Service Layer**: Add business logic
5. **Controllers**: Create API endpoints
6. **Testing**: Test with Swagger UI
7. **Frontend Integration**: Connect with React app

This backend provides a solid foundation for the SkillNet platform with room for future expansion and scaling.

