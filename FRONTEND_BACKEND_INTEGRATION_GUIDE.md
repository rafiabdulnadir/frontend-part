# 🚀 SkillNet Frontend-Backend Integration Guide

Complete step-by-step instructions to connect your React frontend with the ASP.NET Core backend.

## 📋 **Overview**

Your repository contains:
- **Frontend**: React + TypeScript + Vite + ShadCN UI (Port 8080)
- **Backend**: ASP.NET Core 8.0 Web API (Port 7000)
- **Current Status**: Frontend uses mock data, needs real API integration

## 🏗️ **Architecture Overview**

```
┌─────────────────┐    HTTP/HTTPS     ┌─────────────────┐
│   React App     │ ◄──────────────► │  ASP.NET Core   │
│  (Port 8080)    │    REST API       │   (Port 7000)   │
│                 │                   │                 │
│ • Auth Context  │                   │ • JWT Auth      │
│ • API Calls     │                   │ • Controllers   │
│ • State Mgmt    │                   │ • EF Core       │
└─────────────────┘                   └─────────────────┘
                                              │
                                              ▼
                                      ┌─────────────────┐
                                      │   SQL Server    │
                                      │   Database      │
                                      └─────────────────┘
```

## 🚀 **Quick Start (5 Steps)**

### **Step 1: Start the Backend**
```bash
cd SkillNet-Backend
./setup.sh          # Linux/Mac
# OR
setup.bat           # Windows

dotnet run
```
✅ Backend running at: https://localhost:7000

### **Step 2: Install Frontend Dependencies**
```bash
# In root directory (where package.json is)
npm install
# OR
yarn install
```

### **Step 3: Create API Service Layer**
```bash
# Create API utilities
mkdir src/services
touch src/services/api.ts
touch src/services/auth.ts
touch src/services/projects.ts
touch src/services/users.ts
```

### **Step 4: Configure Environment**
```bash
# Create environment file
touch .env.local
```

### **Step 5: Start Frontend**
```bash
npm run dev
# OR
yarn dev
```
✅ Frontend running at: http://localhost:8080

## 📁 **Required File Structure**

After integration, your project should look like:

```
project-root/
├── SkillNet-Backend/           # ASP.NET Core API
├── src/
│   ├── services/              # 👈 NEW: API service layer
│   │   ├── api.ts            # Base API configuration
│   │   ├── auth.ts           # Authentication API calls
│   │   ├── projects.ts       # Project API calls
│   │   ├── users.ts          # User API calls
│   │   └── feedback.ts       # Feedback API calls
│   ├── types/                # 👈 NEW: TypeScript interfaces
│   │   ├── auth.ts           # Auth types
│   │   ├── user.ts           # User types
│   │   ├── project.ts        # Project types
│   │   └── api.ts            # API response types
│   ├── contexts/
│   │   └── AuthContext.tsx   # 👈 UPDATE: Real API integration
│   └── ...
├── .env.local                # 👈 NEW: Environment variables
└── ...
```

## 🔧 **Implementation Steps**

### **1. Environment Configuration**

Create `.env.local`:
```env
# Backend API Configuration
VITE_API_BASE_URL=https://localhost:7000/api
VITE_API_TIMEOUT=10000

# Development Settings
VITE_NODE_ENV=development
VITE_ENABLE_MOCK_DATA=false
```

### **2. Base API Service**

Create `src/services/api.ts`:
```typescript
// Base API configuration and utilities
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7000/api';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');

interface ApiResponse<T> {
  data?: T;
  message?: string;
  errors?: string[];
}

class ApiService {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.timeout = API_TIMEOUT;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        signal: controller.signal,
      });
      return this.handleResponse<T>(response);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });
      return this.handleResponse<T>(response);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });
      return this.handleResponse<T>(response);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
        signal: controller.signal,
      });
      return this.handleResponse<T>(response);
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

export const apiService = new ApiService();
export default apiService;
```

### **3. TypeScript Interfaces**

Create `src/types/auth.ts`:
```typescript
// Authentication types matching backend DTOs
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  rating: number;
  skills: UserSkill[];
  location?: Location;
  createdAt: string;
  updatedAt: string;
}

export interface UserSkill {
  skillName: string;
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience: number;
}

export interface Location {
  latitude?: number;
  longitude?: number;
  address?: string;
}
```

Create `src/types/project.ts`:
```typescript
// Project types matching backend DTOs
export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technology: string;
  domain: string;
  techStack: string[];
  githubLink?: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  category: string;
  technology: string;
  domain: string;
  techStack: string[];
  githubLink?: string;
}

export interface ProjectFilter {
  searchTerm?: string;
  categories?: string[];
  technologies?: string[];
  domains?: string[];
  skip?: number;
  take?: number;
}
```

### **4. Authentication Service**

Create `src/services/auth.ts`:
```typescript
import { apiService } from './api';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    
    // Store tokens
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', userData);
    
    // Store tokens
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiService.post<AuthResponse>('/auth/refresh', {
      refreshToken
    });

    // Update stored tokens
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    try {
      if (refreshToken) {
        await apiService.post('/auth/revoke', { refreshToken });
      }
    } catch (error) {
      console.warn('Failed to revoke token on server:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  async getValidToken(): Promise<string | null> {
    const token = localStorage.getItem('auth_token');
    
    if (!token) return null;
    
    if (this.isTokenExpired(token)) {
      try {
        const response = await this.refreshToken();
        return response.token;
      } catch {
        this.logout();
        return null;
      }
    }
    
    return token;
  }
}

export const authService = new AuthService();
export default authService;
```

### **5. Projects Service**

Create `src/services/projects.ts`:
```typescript
import { apiService } from './api';
import { Project, CreateProjectRequest, ProjectFilter } from '@/types/project';

class ProjectService {
  async getProjects(filter?: ProjectFilter): Promise<Project[]> {
    const queryParams = new URLSearchParams();
    
    if (filter?.searchTerm) queryParams.append('searchTerm', filter.searchTerm);
    if (filter?.categories?.length) {
      filter.categories.forEach(cat => queryParams.append('categories', cat));
    }
    if (filter?.technologies?.length) {
      filter.technologies.forEach(tech => queryParams.append('technologies', tech));
    }
    if (filter?.domains?.length) {
      filter.domains.forEach(domain => queryParams.append('domains', domain));
    }
    if (filter?.skip !== undefined) queryParams.append('skip', filter.skip.toString());
    if (filter?.take !== undefined) queryParams.append('take', filter.take.toString());

    const endpoint = `/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get<Project[]>(endpoint);
  }

  async getProject(id: number): Promise<Project> {
    return apiService.get<Project>(`/projects/${id}`);
  }

  async createProject(projectData: CreateProjectRequest): Promise<Project> {
    return apiService.post<Project>('/projects', projectData);
  }

  async updateProject(id: number, projectData: Partial<CreateProjectRequest>): Promise<Project> {
    return apiService.put<Project>(`/projects/${id}`, projectData);
  }

  async deleteProject(id: number): Promise<void> {
    return apiService.delete<void>(`/projects/${id}`);
  }

  async getMyProjects(): Promise<Project[]> {
    return apiService.get<Project[]>('/projects/my-projects');
  }

  async getUserProjects(userId: string): Promise<Project[]> {
    return apiService.get<Project[]>(`/projects/user/${userId}`);
  }

  async searchProjects(searchTerm: string): Promise<Project[]> {
    return apiService.get<Project[]>(`/projects/search?q=${encodeURIComponent(searchTerm)}`);
  }
}

export const projectService = new ProjectService();
export default projectService;
```

### **6. Users Service**

Create `src/services/users.ts`:
```typescript
import { apiService } from './api';
import { User, UserSkill } from '@/types/auth';

interface UpdateProfileRequest {
  name?: string;
  avatar?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
}

class UserService {
  async getProfile(): Promise<User> {
    return apiService.get<User>('/users/profile');
  }

  async getUserById(userId: string): Promise<User> {
    return apiService.get<User>(`/users/${userId}`);
  }

  async updateProfile(profileData: UpdateProfileRequest): Promise<User> {
    return apiService.put<User>('/users/profile', profileData);
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    return apiService.get<User[]>(`/users/search?q=${encodeURIComponent(searchTerm)}`);
  }

  async getUsersBySkill(skillName: string): Promise<User[]> {
    return apiService.get<User[]>(`/users/by-skill/${encodeURIComponent(skillName)}`);
  }

  async addSkill(skill: Omit<UserSkill, 'id'>): Promise<void> {
    return apiService.post<void>('/users/skills', skill);
  }

  async removeSkill(skillName: string): Promise<void> {
    return apiService.delete<void>(`/users/skills/${encodeURIComponent(skillName)}`);
  }
}

export const userService = new UserService();
export default userService;
```

### **7. Feedback Service**

Create `src/services/feedback.ts`:
```typescript
import { apiService } from './api';

interface FeedbackRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  github?: string;
  subject: string;
  urgency: 'Low' | 'Normal' | 'High' | 'Critical';
  feedbackType: 'General' | 'Bug Report' | 'Feature Request' | 'Technical Support';
  message: string;
}

class FeedbackService {
  async submitFeedback(feedbackData: FeedbackRequest): Promise<void> {
    return apiService.post<void>('/feedback', feedbackData);
  }
}

export const feedbackService = new FeedbackService();
export default feedbackService;
```

### **8. Update AuthContext**

Update `src/contexts/AuthContext.tsx`:
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth';
import { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and validate
    const initializeAuth = async () => {
      try {
        const token = await authService.getValidToken();
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        // Clear invalid auth data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await authService.register({
        name,
        email,
        password,
        confirmPassword: password
      });
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (!user) return;
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### **9. Update FeedbackPage**

Update `src/pages/FeedbackPage.tsx` to use real API:
```typescript
// Replace the handleSubmit function in FeedbackPage.tsx
import { feedbackService } from '@/services/feedback';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("sending");

  try {
    await feedbackService.submitFeedback(formData);
    setStatus("success");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      github: "",
      subject: "",
      urgency: "Normal",
      feedbackType: "General",
      message: "",
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    setStatus("error");
  }
};
```

### **10. Update ProjectsPage**

Update `src/pages/ProjectsPage.tsx` to use real API:
```typescript
// Add these imports at the top
import { useEffect, useState } from "react";
import { projectService } from '@/services/projects';
import { Project } from '@/types/project';

// Replace mockProjects with real data fetching
const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    technologies: [],
    domains: [],
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectService.getProjects({
          searchTerm: searchTerm || undefined,
          categories: filters.categories.length > 0 ? filters.categories : undefined,
          technologies: filters.technologies.length > 0 ? filters.technologies : undefined,
          domains: filters.domains.length > 0 ? filters.domains : undefined,
        });
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [searchTerm, filters]);

  // Rest of your component logic...
};
```

## 🔒 **Security Configuration**

### **CORS Setup (Already configured in backend)**
The backend is already configured to accept requests from your frontend:
```csharp
// In Program.cs - already configured
policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:8080")
```

### **HTTPS in Development**
For development with HTTPS, add to `vite.config.ts`:
```typescript
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    https: false, // Set to true if you want HTTPS in development
  },
  // ... rest of config
}));
```

## 🧪 **Testing the Integration**

### **1. Test Authentication**
```bash
# Start backend
cd SkillNet-Backend && dotnet run

# Start frontend
npm run dev

# Test flow:
# 1. Go to http://localhost:8080/register
# 2. Create an account
# 3. Login with credentials
# 4. Check browser dev tools for API calls
```

### **2. Test API Endpoints**
```bash
# Test with curl (backend running)
curl -X POST https://localhost:7000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "Test123!",
    "confirmPassword": "Test123!"
  }'
```

### **3. Debug Common Issues**

**CORS Errors:**
- Ensure backend is running on port 7000
- Check browser console for CORS errors
- Verify frontend port (8080) is in backend CORS policy

**Authentication Errors:**
- Check JWT token in localStorage
- Verify token format in Network tab
- Ensure backend JWT settings are correct

**API Connection Errors:**
- Verify backend URL in .env.local
- Check if backend is running and accessible
- Test API endpoints directly with Swagger UI

## 🚀 **Production Deployment**

### **Frontend Build**
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### **Environment Variables for Production**
```env
# .env.production
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_API_TIMEOUT=10000
VITE_NODE_ENV=production
```

### **Backend Production**
```bash
# In SkillNet-Backend/
dotnet publish -c Release -o ./publish
```

## 🎯 **Next Steps**

1. **✅ Complete Integration**: Follow all steps above
2. **🧪 Test All Features**: Authentication, projects, user profiles
3. **🔧 Add Error Handling**: Implement proper error boundaries
4. **📊 Add Loading States**: Improve UX with loading indicators
5. **🚀 Deploy**: Deploy both frontend and backend to production

## 🆘 **Troubleshooting**

### **Common Issues:**

**"Network Error" or "Failed to fetch"**
- Backend not running or wrong URL
- CORS configuration issue
- HTTPS/HTTP mismatch

**"401 Unauthorized"**
- JWT token expired or invalid
- Authentication service not working
- Token not being sent in headers

**"404 Not Found"**
- Wrong API endpoint URL
- Backend route not configured
- Typo in service methods

### **Debug Steps:**
1. Check browser Network tab for API calls
2. Verify backend is running at https://localhost:7000
3. Test API endpoints in Swagger UI
4. Check console for JavaScript errors
5. Verify environment variables are loaded

---

## 🎉 **You're Ready!**

After following this guide, you'll have:
- ✅ **Real API Integration** instead of mock data
- ✅ **JWT Authentication** working end-to-end  
- ✅ **Full CRUD Operations** for projects and users
- ✅ **Production-Ready Setup** with proper error handling
- ✅ **Type-Safe API Calls** with TypeScript

**Your SkillNet platform is now fully integrated and ready for users!** 🚀

