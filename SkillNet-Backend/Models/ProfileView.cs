using System.ComponentModel.DataAnnotations;

namespace SkillNet.Api.Models;

public class ProfileView
{
    public int Id { get; set; }
    
    public string? ViewerId { get; set; } // Nullable for anonymous views
    
    [Required]
    public string ProfileId { get; set; } = string.Empty;
    
    public DateTime ViewedAt { get; set; } = DateTime.UtcNow;
    
    [MaxLength(45)]
    public string? IpAddress { get; set; }
    
    [MaxLength(500)]
    public string? UserAgent { get; set; }
    
    // Navigation properties
    public virtual User? Viewer { get; set; }
    public virtual User Profile { get; set; } = null!;
}
