using System.ComponentModel.DataAnnotations;

namespace SkillNet.Api.Models;

public class Message
{
    public int Id { get; set; }
    
    [Required]
    public int ConversationId { get; set; }
    
    [Required]
    public string SenderId { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(2000)]
    public string Content { get; set; } = string.Empty;
    
    public bool IsRead { get; set; } = false;
    
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual Conversation Conversation { get; set; } = null!;
    public virtual User Sender { get; set; } = null!;
}
