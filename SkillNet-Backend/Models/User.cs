using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SkillNet.Api.Models;

public class User : IdentityUser
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string? Avatar { get; set; }
    
    public double Rating { get; set; } = 0.0;
    
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    
    [MaxLength(200)]
    public string? Address { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual ICollection<UserSkill> Skills { get; set; } = new List<UserSkill>();
    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
    public virtual ICollection<ConversationParticipant> ConversationParticipants { get; set; } = new List<ConversationParticipant>();
    public virtual ICollection<Message> SentMessages { get; set; } = new List<Message>();
    public virtual ICollection<ProfileView> ProfileViews { get; set; } = new List<ProfileView>();
    public virtual ICollection<ProfileView> ViewedProfiles { get; set; } = new List<ProfileView>();
}

