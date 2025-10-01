using System.ComponentModel.DataAnnotations;

namespace SkillNet.Api.Models;

public class Feedback
{
    public int Id { get; set; }
    
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
    public string Urgency { get; set; } = "Normal"; // Low, Normal, High, Critical
    
    [Required]
    [MaxLength(50)]
    public string FeedbackType { get; set; } = "General"; // General, Bug Report, Feature Request, Other
    
    [Required]
    [MaxLength(2000)]
    public string Message { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
