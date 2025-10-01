using SkillNet.Api.Models;

namespace SkillNet.Api.Repositories;

public interface IProjectRepository : IGenericRepository<Project>
{
    Task<IEnumerable<Project>> GetProjectsByUserAsync(string userId);
    Task<IEnumerable<Project>> SearchProjectsAsync(string searchTerm);
    Task<IEnumerable<Project>> GetFilteredProjectsAsync(
        string? searchTerm = null,
        List<string>? categories = null,
        List<string>? technologies = null,
        List<string>? domains = null,
        int skip = 0,
        int take = 20);
}
