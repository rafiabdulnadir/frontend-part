#!/bin/bash

# Create Repository interfaces and implementations
cat > SkillNet.Api/Repositories/IGenericRepository.cs << 'INNER_EOF'
using System.Linq.Expressions;

namespace SkillNet.Api.Repositories;

public interface IGenericRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<T?> GetByIdAsync(string id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> expression);
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
}
INNER_EOF

cat > SkillNet.Api/Repositories/GenericRepository.cs << 'INNER_EOF'
using Microsoft.EntityFrameworkCore;
using SkillNet.Api.Data;
using System.Linq.Expressions;

namespace SkillNet.Api.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<T> _dbSet;
    
    public GenericRepository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }
    
    public async Task<T?> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }
    
    public async Task<T?> GetByIdAsync(string id)
    {
        return await _dbSet.FindAsync(id);
    }
    
    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }
    
    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> expression)
    {
        return await _dbSet.Where(expression).ToListAsync();
    }
    
    public async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }
    
    public async Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
    }
    
    public async Task DeleteAsync(T entity)
    {
        _dbSet.Remove(entity);
        await _context.SaveChangesAsync();
    }
}
INNER_EOF

# Create specific repositories
cat > SkillNet.Api/Repositories/IUserRepository.cs << 'INNER_EOF'
using SkillNet.Api.Models;

namespace SkillNet.Api.Repositories;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User?> GetUserWithSkillsAsync(string userId);
    Task<IEnumerable<User>> SearchUsersAsync(string searchTerm);
    Task<IEnumerable<User>> GetUsersBySkillAsync(string skillName);
}
INNER_EOF

cat > SkillNet.Api/Repositories/UserRepository.cs << 'INNER_EOF'
using Microsoft.EntityFrameworkCore;
using SkillNet.Api.Data;
using SkillNet.Api.Models;

namespace SkillNet.Api.Repositories;

public class UserRepository : GenericRepository<User>, IUserRepository
{
    public UserRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    public async Task<User?> GetUserWithSkillsAsync(string userId)
    {
        return await _context.Users
            .Include(u => u.Skills)
            .FirstOrDefaultAsync(u => u.Id == userId);
    }
    
    public async Task<IEnumerable<User>> SearchUsersAsync(string searchTerm)
    {
        return await _context.Users
            .Include(u => u.Skills)
            .Where(u => u.Name.Contains(searchTerm) || 
                       u.Email!.Contains(searchTerm) ||
                       u.Skills.Any(s => s.SkillName.Contains(searchTerm)))
            .ToListAsync();
    }
    
    public async Task<IEnumerable<User>> GetUsersBySkillAsync(string skillName)
    {
        return await _context.Users
            .Include(u => u.Skills)
            .Where(u => u.Skills.Any(s => s.SkillName.ToLower() == skillName.ToLower()))
            .ToListAsync();
    }
}
INNER_EOF

cat > SkillNet.Api/Repositories/IProjectRepository.cs << 'INNER_EOF'
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
INNER_EOF

cat > SkillNet.Api/Repositories/ProjectRepository.cs << 'INNER_EOF'
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
INNER_EOF

cat > SkillNet.Api/Repositories/IMessageRepository.cs << 'INNER_EOF'
using SkillNet.Api.Models;

namespace SkillNet.Api.Repositories;

public interface IMessageRepository : IGenericRepository<Message>
{
    Task<IEnumerable<Message>> GetConversationMessagesAsync(int conversationId);
    Task<IEnumerable<Conversation>> GetUserConversationsAsync(string userId);
}
INNER_EOF

cat > SkillNet.Api/Repositories/MessageRepository.cs << 'INNER_EOF'
using Microsoft.EntityFrameworkCore;
using SkillNet.Api.Data;
using SkillNet.Api.Models;

namespace SkillNet.Api.Repositories;

public class MessageRepository : GenericRepository<Message>, IMessageRepository
{
    public MessageRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    public async Task<IEnumerable<Message>> GetConversationMessagesAsync(int conversationId)
    {
        return await _context.Messages
            .Include(m => m.Sender)
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.SentAt)
            .ToListAsync();
    }
    
    public async Task<IEnumerable<Conversation>> GetUserConversationsAsync(string userId)
    {
        return await _context.Conversations
            .Include(c => c.Participants)
                .ThenInclude(p => p.User)
            .Include(c => c.Messages.OrderByDescending(m => m.SentAt).Take(1))
                .ThenInclude(m => m.Sender)
            .Where(c => c.Participants.Any(p => p.UserId == userId))
            .OrderByDescending(c => c.UpdatedAt)
            .ToListAsync();
    }
}
INNER_EOF

echo "Repository files created successfully!"
