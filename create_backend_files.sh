#!/bin/bash

# Create all the remaining model files
cat > SkillNet.Api/Models/Conversation.cs << 'INNER_EOF'
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
INNER_EOF

cat > SkillNet.Api/Models/Message.cs << 'INNER_EOF'
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
INNER_EOF

cat > SkillNet.Api/Models/Feedback.cs << 'INNER_EOF'
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
INNER_EOF

cat > SkillNet.Api/Models/ProfileView.cs << 'INNER_EOF'
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
INNER_EOF

echo "Model files created successfully!"
