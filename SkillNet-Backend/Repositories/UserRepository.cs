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
