using Microsoft.EntityFrameworkCore;
using SkillNet.Api.Data;
using SkillNet.Api.Models;

namespace SkillNet.Api.Repositories;

public class ProjectRepository : GenericRepository<Project>, IProjectRepository
{
    public ProjectRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    public async Task<IEnumerable<Project>> GetProjectsByUserAsync(string userId)
    {
        return await _context.Projects
            .Include(p => p.User)
                .ThenInclude(u => u.Skills)
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }
    
    public async Task<IEnumerable<Project>> SearchProjectsAsync(string searchTerm)
    {
        return await _context.Projects
            .Include(p => p.User)
                .ThenInclude(u => u.Skills)
            .Where(p => p.Title.Contains(searchTerm) ||
                       p.Description.Contains(searchTerm) ||
                       p.Category.Contains(searchTerm) ||
                       p.Technology.Contains(searchTerm) ||
                       p.Domain.Contains(searchTerm))
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }
    
    public async Task<IEnumerable<Project>> GetFilteredProjectsAsync(
        string? searchTerm = null,
        List<string>? categories = null,
        List<string>? technologies = null,
        List<string>? domains = null,
        int skip = 0,
        int take = 20)
    {
        var query = _context.Projects
            .Include(p => p.User)
                .ThenInclude(u => u.Skills)
            .AsQueryable();
        
        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(p => p.Title.Contains(searchTerm) ||
                                   p.Description.Contains(searchTerm) ||
                                   p.Category.Contains(searchTerm) ||
                                   p.Technology.Contains(searchTerm) ||
                                   p.Domain.Contains(searchTerm));
        }
        
        if (categories != null && categories.Any())
        {
            query = query.Where(p => categories.Contains(p.Category));
        }
        
        if (technologies != null && technologies.Any())
        {
            query = query.Where(p => technologies.Contains(p.Technology));
        }
        
        if (domains != null && domains.Any())
        {
            query = query.Where(p => domains.Contains(p.Domain));
        }
        
        return await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip(skip)
            .Take(take)
            .ToListAsync();
    }
}
