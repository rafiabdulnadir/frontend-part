using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SkillNet.Api.Models;

namespace SkillNet.Api.Data;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    public DbSet<UserSkill> UserSkills { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Conversation> Conversations { get; set; }
    public DbSet<ConversationParticipant> ConversationParticipants { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }
    public DbSet<ProfileView> ProfileViews { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        // User entity configuration
        builder.Entity<User>(entity =>
        {
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Avatar).HasMaxLength(500);
            entity.Property(e => e.Address).HasMaxLength(200);
            entity.Property(e => e.Rating).HasDefaultValue(0.0);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
            
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.Rating);
        });
        
        // UserSkill entity configuration
        builder.Entity<UserSkill>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.SkillName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.ProficiencyLevel).HasDefaultValue(1);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            
            entity.HasOne(e => e.User)
                  .WithMany(u => u.Skills)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasIndex(e => new { e.UserId, e.SkillName }).IsUnique();
        });
        
        // Project entity configuration
        builder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(1000);
            entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Technology).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Domain).IsRequired().HasMaxLength(50);
            entity.Property(e => e.TechStack).HasMaxLength(500);
            entity.Property(e => e.GithubLink).HasMaxLength(500);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
            
            entity.HasOne(e => e.User)
                  .WithMany(u => u.Projects)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasIndex(e => e.Category);
            entity.HasIndex(e => e.Technology);
            entity.HasIndex(e => e.Domain);
            entity.HasIndex(e => e.CreatedAt);
        });
        
        // Conversation entity configuration
        builder.Entity<Conversation>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
        });
        
        // ConversationParticipant entity configuration
        builder.Entity<ConversationParticipant>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.JoinedAt).HasDefaultValueSql("GETUTCDATE()");
            
            entity.HasOne(e => e.Conversation)
                  .WithMany(c => c.Participants)
                  .HasForeignKey(e => e.ConversationId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasOne(e => e.User)
                  .WithMany(u => u.ConversationParticipants)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasIndex(e => new { e.ConversationId, e.UserId }).IsUnique();
        });
        
        // Message entity configuration
        builder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Content).IsRequired().HasMaxLength(2000);
            entity.Property(e => e.IsRead).HasDefaultValue(false);
            entity.Property(e => e.SentAt).HasDefaultValueSql("GETUTCDATE()");
            
            entity.HasOne(e => e.Conversation)
                  .WithMany(c => c.Messages)
                  .HasForeignKey(e => e.ConversationId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasOne(e => e.Sender)
                  .WithMany(u => u.SentMessages)
                  .HasForeignKey(e => e.SenderId)
                  .OnDelete(DeleteBehavior.Restrict);
                  
            entity.HasIndex(e => e.ConversationId);
            entity.HasIndex(e => e.SentAt);
        });
        
        // Feedback entity configuration
        builder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.Company).HasMaxLength(100);
            entity.Property(e => e.Role).HasMaxLength(100);
            entity.Property(e => e.Github).HasMaxLength(500);
            entity.Property(e => e.Subject).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Urgency).IsRequired().HasMaxLength(20).HasDefaultValue("Normal");
            entity.Property(e => e.FeedbackType).IsRequired().HasMaxLength(50).HasDefaultValue("General");
            entity.Property(e => e.Message).IsRequired().HasMaxLength(2000);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            
            entity.HasIndex(e => e.CreatedAt);
            entity.HasIndex(e => e.FeedbackType);
            entity.HasIndex(e => e.Urgency);
        });
        
        // ProfileView entity configuration
        builder.Entity<ProfileView>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ViewedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(e => e.IpAddress).HasMaxLength(45);
            entity.Property(e => e.UserAgent).HasMaxLength(500);
            
            entity.HasOne(e => e.Viewer)
                  .WithMany(u => u.ViewedProfiles)
                  .HasForeignKey(e => e.ViewerId)
                  .OnDelete(DeleteBehavior.SetNull);
                  
            entity.HasOne(e => e.Profile)
                  .WithMany(u => u.ProfileViews)
                  .HasForeignKey(e => e.ProfileId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasIndex(e => e.ProfileId);
            entity.HasIndex(e => e.ViewedAt);
        });
    }
}

