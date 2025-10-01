using Microsoft.EntityFrameworkCore;
using SkillNet.Api.Data;
using SkillNet.Api.DTOs.Project;
using SkillNet.Api.DTOs.User;
using SkillNet.Api.Models;
using SkillNet.Api.Repositories;
using System.Text.Json;

namespace SkillNet.Api.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _projectRepository;
    private readonly ApplicationDbContext _context;
    
    public ProjectService(IProjectRepository projectRepository, ApplicationDbContext context)
    {
        _projectRepository = projectRepository;
        _context = context;
    }
    
    public async Task<ProjectDto?> GetProjectByIdAsync(int projectId)
    {
        var project = await _context.Projects
            .Include(p => p.User)
                .ThenInclude(u => u.Skills)
            .FirstOrDefaultAsync(p => p.Id == projectId);
        
        if (project == null) return null;
        
        return MapToProjectDto(project);
    }
    
    public async Task<IEnumerable<ProjectDto>> GetAllProjectsAsync()
    {
        var projects = await _context.Projects
            .Include(p => p.User)
                .ThenInclude(u => u.Skills)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
        
        return projects.Select(MapToProjectDto);
    }
    
    public async Task<IEnumerable<ProjectDto>> GetProjectsByUserAsync(string userId)
    {
        var projects = await _projectRepository.GetProjectsByUserAsync(userId);
        return projects.Select(MapToProjectDto);
    }
    
    public async Task<IEnumerable<ProjectDto>> SearchProjectsAsync(string searchTerm)
    {
        var projects = await _projectRepository.SearchProjectsAsync(searchTerm);
        return projects.Select(MapToProjectDto);
    }
    
    public async Task<IEnumerable<ProjectDto>> GetFilteredProjectsAsync(ProjectFilterDto filter)
    {
        var projects = await _projectRepository.GetFilteredProjectsAsync(
            filter.SearchTerm,
            filter.Categories,
            filter.Technologies,
            filter.Domains,
            filter.Skip,
            filter.Take);
        
        return projects.Select(MapToProjectDto);
    }
    
    public async Task<ProjectDto> CreateProjectAsync(string userId, CreateProjectDto createDto)
    {
        var project = new Project
        {
            Title = createDto.Title,
            Description = createDto.Description,
            Category = createDto.Category,
            Technology = createDto.Technology,
            Domain = createDto.Domain,
            TechStack = JsonSerializer.Serialize(createDto.TechStack),
            GithubLink = createDto.GithubLink,
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        
        var createdProject = await _projectRepository.AddAsync(project);
        
        // Load the project with user data
        var projectWithUser = await _context.Projects
            .Include(p => p.User)
                .ThenInclude(u => u.Skills)
            .FirstOrDefaultAsync(p => p.Id == createdProject.Id);
        
        return MapToProjectDto(projectWithUser!);
    }
    
    public async Task<ProjectDto> UpdateProjectAsync(int projectId, string userId, UpdateProjectDto updateDto)
    {
        var project = await _projectRepository.GetByIdAsync(projectId);
        if (project == null)
        {
            throw new ArgumentException("Project not found");
        }
        
        if (project.UserId != userId)
        {
            throw new UnauthorizedAccessException("You can only update your own projects");
        }
        
        if (!string.IsNullOrEmpty(updateDto.Title))
        {
            project.Title = updateDto.Title;
        }
        
        if (!string.IsNullOrEmpty(updateDto.Description))
        {
            project.Description = updateDto.Description;
        }
        
        if (!string.IsNullOrEmpty(updateDto.Category))
        {
            project.Category = updateDto.Category;
        }
        
        if (!string.IsNullOrEmpty(updateDto.Technology))
        {
            project.Technology = updateDto.Technology;
        }
        
        if (!string.IsNullOrEmpty(updateDto.Domain))
        {
            project.Domain = updateDto.Domain;
        }
        
        if (updateDto.TechStack != null)
        {
            project.TechStack = JsonSerializer.Serialize(updateDto.TechStack);
        }
        
        if (updateDto.GithubLink != null)
        {
            project.GithubLink = updateDto.GithubLink;
        }
        
        project.UpdatedAt = DateTime.UtcNow;
        
        await _projectRepository.UpdateAsync(project);
        
        // Load the updated project with user data
        var updatedProject = await _context.Projects
            .Include(p => p.User)
                .ThenInclude(u => u.Skills)
            .FirstOrDefaultAsync(p => p.Id == projectId);
        
        return MapToProjectDto(updatedProject!);
    }
    
    public async Task DeleteProjectAsync(int projectId, string userId)
    {
        var project = await _projectRepository.GetByIdAsync(projectId);
        if (project == null)
        {
            throw new ArgumentException("Project not found");
        }
        
        if (project.UserId != userId)
        {
            throw new UnauthorizedAccessException("You can only delete your own projects");
        }
        
        await _projectRepository.DeleteAsync(project);
    }
    
    private static ProjectDto MapToProjectDto(Project project)
    {
        return new ProjectDto
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            Category = project.Category,
            Technology = project.Technology,
            Domain = project.Domain,
            TechStack = string.IsNullOrEmpty(project.TechStack) 
                ? new List<string>() 
                : JsonSerializer.Deserialize<List<string>>(project.TechStack) ?? new List<string>(),
            GithubLink = project.GithubLink,
            CreatedAt = project.CreatedAt,
            UpdatedAt = project.UpdatedAt,
            User = project.User != null ? new UserDto
            {
                Id = project.User.Id,
                Email = project.User.Email ?? string.Empty,
                Name = project.User.Name,
                Avatar = project.User.Avatar,
                Rating = project.User.Rating,
                Skills = project.User.Skills?.Select(s => new UserSkillDto
                {
                    SkillName = s.SkillName,
                    ProficiencyLevel = s.ProficiencyLevel
                }).ToList() ?? new List<UserSkillDto>(),
                Location = project.User.Latitude.HasValue && project.User.Longitude.HasValue
                    ? new LocationDto
                    {
                        Lat = project.User.Latitude.Value,
                        Lng = project.User.Longitude.Value,
                        Address = project.User.Address ?? string.Empty
                    }
                    : null,
                CreatedAt = project.User.CreatedAt
            } : null
        };
    }
}

