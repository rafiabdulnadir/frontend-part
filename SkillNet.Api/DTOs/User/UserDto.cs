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
