using System.ComponentModel.DataAnnotations;

namespace SkillNet.Api.Models;

public class Project
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(50)]
    public string Category { get; set; } = string.Empty; // Frontend, Backend, AI, IoT, DevOps
    
    [Required]
    [MaxLength(50)]
    public string Technology { get; set; } = string.Empty; // React, Node.js, Python, etc.
    
    [Required]
    [MaxLength(50)]
    public string Domain { get; set; } = string.Empty; // EdTech, Healthcare, Finance, etc.
    
    [MaxLength(500)]
    public string TechStack { get; set; } = string.Empty; // JSON array as string
    
    [MaxLength(500)]
    public string? GithubLink { get; set; }
    
    [Required]
    public string UserId { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
}

