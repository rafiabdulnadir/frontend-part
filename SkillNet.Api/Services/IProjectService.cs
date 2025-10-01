using SkillNet.Api.DTOs.Project;

namespace SkillNet.Api.Services;

public interface IProjectService
{
    Task<ProjectDto?> GetProjectByIdAsync(int projectId);
    Task<IEnumerable<ProjectDto>> GetAllProjectsAsync();
    Task<IEnumerable<ProjectDto>> GetProjectsByUserAsync(string userId);
    Task<IEnumerable<ProjectDto>> SearchProjectsAsync(string searchTerm);
    Task<IEnumerable<ProjectDto>> GetFilteredProjectsAsync(ProjectFilterDto filter);
    Task<ProjectDto> CreateProjectAsync(string userId, CreateProjectDto createDto);
    Task<ProjectDto> UpdateProjectAsync(int projectId, string userId, UpdateProjectDto updateDto);
    Task DeleteProjectAsync(int projectId, string userId);
}
