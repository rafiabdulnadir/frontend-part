using System.ComponentModel.DataAnnotations;

namespace SkillNet.Api.Models;

public class Conversation
{
    public int Id { get; set; }
    
    [MaxLength(200)]
    public string? Title { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual ICollection<ConversationParticipant> Participants { get; set; } = new List<ConversationParticipant>();
    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}

public class ConversationParticipant
{
    public int Id { get; set; }
    
    [Required]
    public int ConversationId { get; set; }
    
    [Required]
    public string UserId { get; set; } = string.Empty;
    
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual Conversation Conversation { get; set; } = null!;
    public virtual User User { get; set; } = null!;
}
