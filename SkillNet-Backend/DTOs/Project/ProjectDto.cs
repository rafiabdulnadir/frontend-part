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
