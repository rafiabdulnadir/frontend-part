using SkillNet.Api.DTOs.User;

namespace SkillNet.Api.Services;

public interface IUserService
{
    Task<UserProfileDto?> GetUserProfileAsync(string userId);
    Task<UserProfileDto> UpdateUserProfileAsync(string userId, UpdateUserProfileDto updateDto);
    Task<IEnumerable<UserDto>> SearchUsersAsync(string searchTerm);
    Task<IEnumerable<UserDto>> GetUsersBySkillAsync(string skillName);
    Task AddUserSkillAsync(string userId, string skillName, int proficiencyLevel);
    Task RemoveUserSkillAsync(string userId, string skillName);
    Task RecordProfileViewAsync(string profileId, string? viewerId, string? ipAddress, string? userAgent);
}
