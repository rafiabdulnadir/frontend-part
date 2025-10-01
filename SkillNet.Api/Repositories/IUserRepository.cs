using SkillNet.Api.Models;

namespace SkillNet.Api.Repositories;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User?> GetUserWithSkillsAsync(string userId);
    Task<IEnumerable<User>> SearchUsersAsync(string searchTerm);
    Task<IEnumerable<User>> GetUsersBySkillAsync(string skillName);
}
