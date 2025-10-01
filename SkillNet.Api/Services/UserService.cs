using Microsoft.EntityFrameworkCore;
using SkillNet.Api.Data;
using SkillNet.Api.DTOs.User;
using SkillNet.Api.Models;
using SkillNet.Api.Repositories;

namespace SkillNet.Api.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly ApplicationDbContext _context;
    
    public UserService(IUserRepository userRepository, ApplicationDbContext context)
    {
        _userRepository = userRepository;
        _context = context;
    }
    
    public async Task<UserProfileDto?> GetUserProfileAsync(string userId)
    {
        var user = await _context.Users
            .Include(u => u.Skills)
            .Include(u => u.Projects)
            .Include(u => u.ProfileViews)
            .FirstOrDefaultAsync(u => u.Id == userId);
        
        if (user == null) return null;
        
        return new UserProfileDto
        {
            Id = user.Id,
            Email = user.Email ?? string.Empty,
            Name = user.Name,
            Avatar = user.Avatar,
            Rating = user.Rating,
            Skills = user.Skills.Select(s => new UserSkillDto
            {
                SkillName = s.SkillName,
                ProficiencyLevel = s.ProficiencyLevel
            }).ToList(),
            Location = user.Latitude.HasValue && user.Longitude.HasValue
                ? new LocationDto
                {
                    Lat = user.Latitude.Value,
                    Lng = user.Longitude.Value,
                    Address = user.Address ?? string.Empty
                }
                : null,
            CreatedAt = user.CreatedAt,
            ProjectCount = user.Projects.Count,
            ProfileViews = user.ProfileViews.Count
        };
    }
    
    public async Task<UserProfileDto> UpdateUserProfileAsync(string userId, UpdateUserProfileDto updateDto)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            throw new ArgumentException("User not found");
        }
        
        if (!string.IsNullOrEmpty(updateDto.Name))
        {
            user.Name = updateDto.Name;
        }
        
        if (updateDto.Avatar != null)
        {
            user.Avatar = updateDto.Avatar;
        }
        
        if (updateDto.Location != null)
        {
            user.Latitude = updateDto.Location.Lat;
            user.Longitude = updateDto.Location.Lng;
            user.Address = updateDto.Location.Address;
        }
        
        user.UpdatedAt = DateTime.UtcNow;
        
        await _userRepository.UpdateAsync(user);
        
        var updatedProfile = await GetUserProfileAsync(userId);
        return updatedProfile!;
    }
    
    public async Task<IEnumerable<UserDto>> SearchUsersAsync(string searchTerm)
    {
        var users = await _userRepository.SearchUsersAsync(searchTerm);
        return users.Select(MapToUserDto);
    }
    
    public async Task<IEnumerable<UserDto>> GetUsersBySkillAsync(string skillName)
    {
        var users = await _userRepository.GetUsersBySkillAsync(skillName);
        return users.Select(MapToUserDto);
    }
    
    public async Task AddUserSkillAsync(string userId, string skillName, int proficiencyLevel)
    {
        var existingSkill = await _context.UserSkills
            .FirstOrDefaultAsync(s => s.UserId == userId && s.SkillName == skillName);
        
        if (existingSkill != null)
        {
            existingSkill.ProficiencyLevel = proficiencyLevel;
            _context.UserSkills.Update(existingSkill);
        }
        else
        {
            var skill = new UserSkill
            {
                UserId = userId,
                SkillName = skillName,
                ProficiencyLevel = proficiencyLevel,
                CreatedAt = DateTime.UtcNow
            };
            
            await _context.UserSkills.AddAsync(skill);
        }
        
        await _context.SaveChangesAsync();
    }
    
    public async Task RemoveUserSkillAsync(string userId, string skillName)
    {
        var skill = await _context.UserSkills
            .FirstOrDefaultAsync(s => s.UserId == userId && s.SkillName == skillName);
        
        if (skill != null)
        {
            _context.UserSkills.Remove(skill);
            await _context.SaveChangesAsync();
        }
    }
    
    public async Task RecordProfileViewAsync(string profileId, string? viewerId, string? ipAddress, string? userAgent)
    {
        var profileView = new ProfileView
        {
            ProfileId = profileId,
            ViewerId = viewerId,
            IpAddress = ipAddress,
            UserAgent = userAgent,
            ViewedAt = DateTime.UtcNow
        };
        
        await _context.ProfileViews.AddAsync(profileView);
        await _context.SaveChangesAsync();
    }
    
    private static UserDto MapToUserDto(User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email ?? string.Empty,
            Name = user.Name,
            Avatar = user.Avatar,
            Rating = user.Rating,
            Skills = user.Skills?.Select(s => new UserSkillDto
            {
                SkillName = s.SkillName,
                ProficiencyLevel = s.ProficiencyLevel
            }).ToList() ?? new List<UserSkillDto>(),
            Location = user.Latitude.HasValue && user.Longitude.HasValue
                ? new LocationDto
                {
                    Lat = user.Latitude.Value,
                    Lng = user.Longitude.Value,
                    Address = user.Address ?? string.Empty
                }
                : null,
            CreatedAt = user.CreatedAt
        };
    }
}
