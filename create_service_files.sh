#!/bin/bash

# Create Service interfaces and implementations
cat > SkillNet.Api/Services/IAuthService.cs << 'INNER_EOF'
using SkillNet.Api.DTOs.Auth;

namespace SkillNet.Api.Services;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
    Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
    Task RevokeTokenAsync(string refreshToken);
}
INNER_EOF

cat > SkillNet.Api/Services/AuthService.cs << 'INNER_EOF'
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using SkillNet.Api.DTOs.Auth;
using SkillNet.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SkillNet.Api.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    
    public AuthService(UserManager<User> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }
    
    public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
    {
        var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
        if (existingUser != null)
        {
            throw new InvalidOperationException("User with this email already exists");
        }
        
        var user = new User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
            Name = registerDto.Name,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        
        var result = await _userManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded)
        {
            throw new InvalidOperationException(string.Join(", ", result.Errors.Select(e => e.Description)));
        }
        
        return await GenerateAuthResponse(user);
    }
    
    public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        if (user == null)
        {
            throw new UnauthorizedAccessException("Invalid email or password");
        }
        
        var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
        if (!isPasswordValid)
        {
            throw new UnauthorizedAccessException("Invalid email or password");
        }
        
        return await GenerateAuthResponse(user);
    }
    
    public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
    {
        // In a real application, you would validate the refresh token against a database
        // For this example, we'll just generate a new token
        throw new NotImplementedException("Refresh token functionality not implemented");
    }
    
    public async Task RevokeTokenAsync(string refreshToken)
    {
        // In a real application, you would revoke the refresh token in the database
        // For this example, we'll just return
        await Task.CompletedTask;
    }
    
    private async Task<AuthResponseDto> GenerateAuthResponse(User user)
    {
        var token = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken();
        
        return new AuthResponseDto
        {
            Token = token,
            RefreshToken = refreshToken,
            Expiration = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["JwtSettings:ExpirationInMinutes"]!)),
            User = new UserInfoDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email!,
                Avatar = user.Avatar,
                Rating = user.Rating
            }
        };
    }
    
    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var secretKey = jwtSettings["SecretKey"]!;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        
        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(int.Parse(jwtSettings["ExpirationInMinutes"]!)),
            signingCredentials: credentials
        );
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    private static string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }
}
INNER_EOF

cat > SkillNet.Api/Services/IUserService.cs << 'INNER_EOF'
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
INNER_EOF

cat > SkillNet.Api/Services/UserService.cs << 'INNER_EOF'
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
INNER_EOF

cat > SkillNet.Api/Services/IProjectService.cs << 'INNER_EOF'
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
INNER_EOF

echo "Service files created successfully!"
