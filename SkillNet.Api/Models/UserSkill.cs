using System.ComponentModel.DataAnnotations;

namespace SkillNet.Api.Models;

public class UserSkill
{
    public int Id { get; set; }
    
    [Required]
    public string UserId { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string SkillName { get; set; } = string.Empty;
    
    [Range(1, 5)]
    public int ProficiencyLevel { get; set; } = 1; // 1-5 scale
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
}

