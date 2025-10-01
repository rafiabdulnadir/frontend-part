#!/bin/bash

# Create DTOs
mkdir -p SkillNet.Api/DTOs/{Auth,User,Project,Feedback}

# Auth DTOs
cat > SkillNet.Api/DTOs/Auth/AuthDto.cs << 'INNER_EOF'
using System.ComponentModel.DataAnnotations;

namespace SkillNet.Api.DTOs.Auth;

public class RegisterDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;
    
    [Required]
    [Compare("Password")]
    public string ConfirmPassword { get; set; } = string.Empty;
}

public class LoginDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string Password { get; set; } = string.Empty;
}

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime Expiration { get; set; }
    public UserInfoDto User { get; set; } = null!;
}

public class UserInfoDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Avatar { get; set; }
    public double Rating { get; set; }
}

public class RefreshTokenDto
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}
INNER_EOF

# User DTOs
cat > SkillNet.Api/DTOs/User/UserDto.cs << 'INNER_EOF'
using System.ComponentModel.DataAnnotations;

namespace SkillNet.Api.DTOs.User;

public class UserDto
{
    public string Id { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Avatar { get; set; }
    public double Rating { get; set; }
    public List<UserSkillDto> Skills { get; set; } = new();
    public LocationDto? Location { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class UserProfileDto
{
    public string Id { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Avatar { get; set; }
    public double Rating { get; set; }
    public List<UserSkillDto> Skills { get; set; } = new();
    public LocationDto? Location { get; set; }
    public DateTime CreatedAt { get; set; }
    public int ProjectCount { get; set; }
    public int ProfileViews { get; set; }
}

public class UpdateUserProfileDto
{
    [MaxLength(100)]
    public string? Name { get; set; }
    
    [MaxLength(500)]
    public string? Avatar { get; set; }
    
    public LocationDto? Location { get; set; }
}

public class UserSkillDto
{
    public string SkillName { get; set; } = string.Empty;
    public int ProficiencyLevel { get; set; }
}

public class AddUserSkillDto
{
    [Required]
    [MaxLength(100)]
    public string SkillName { get; set; } = string.Empty;
    
    [Range(1, 5)]
    public int ProficiencyLevel { get; set; } = 1;
}

public class LocationDto
{
    public double Lat { get; set; }
    public double Lng { get; set; }
    public string Address { get; set; } = string.Empty;
}
INNER_EOF

# Project DTOs
cat > SkillNet.Api/DTOs/Project/ProjectDto.cs << 'INNER_EOF'
using SkillNet.Api.DTOs.User;
using System.ComponentModel.DataAnnotations;

namespace SkillNet.Api.DTOs.Project;

public class ProjectDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Technology { get; set; } = string.Empty;
    public string Domain { get; set; } = string.Empty;
    public List<string> TechStack { get; set; } = new();
    public string? GithubLink { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public UserDto? User { get; set; }
}

public class CreateProjectDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(50)]
    public string Category { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(50)]
    public string Technology { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(50)]
    public string Domain { get; set; } = string.Empty;
    
    public List<string> TechStack { get; set; } = new();
    
    [MaxLength(500)]
    public string? GithubLink { get; set; }
}

public class UpdateProjectDto
{
    [MaxLength(200)]
    public string? Title { get; set; }
    
    [MaxLength(1000)]
    public string? Description { get; set; }
    
    [MaxLength(50)]
    public string? Category { get; set; }
    
    [MaxLength(50)]
    public string? Technology { get; set; }
    
    [MaxLength(50)]
    public string? Domain { get; set; }
    
    public List<string>? TechStack { get; set; }
    
    [MaxLength(500)]
    public string? GithubLink { get; set; }
}

public class ProjectFilterDto
{
    public string? SearchTerm { get; set; }
    public List<string>? Categories { get; set; }
    public List<string>? Technologies { get; set; }
    public List<string>? Domains { get; set; }
    public int Skip { get; set; } = 0;
    public int Take { get; set; } = 20;
}
INNER_EOF

# Feedback DTOs
cat > SkillNet.Api/DTOs/Feedback/FeedbackDto.cs << 'INNER_EOF'
using System.ComponentModel.DataAnnotations;

namespace SkillNet.Api.DTOs.Feedback;

public class CreateFeedbackDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(200)]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [MaxLength(20)]
    public string? Phone { get; set; }
    
    [MaxLength(100)]
    public string? Company { get; set; }
    
    [MaxLength(100)]
    public string? Role { get; set; }
    
    [MaxLength(500)]
    public string? Github { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Subject { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(20)]
    public string Urgency { get; set; } = "Normal";
    
    [Required]
    [MaxLength(50)]
    public string FeedbackType { get; set; } = "General";
    
    [Required]
    [MaxLength(2000)]
    public string Message { get; set; } = string.Empty;
}
INNER_EOF

echo "DTO files created successfully!"
