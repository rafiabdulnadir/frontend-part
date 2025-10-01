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
