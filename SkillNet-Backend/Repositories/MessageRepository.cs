using Microsoft.EntityFrameworkCore;
using SkillNet.Api.Data;
using SkillNet.Api.Models;

namespace SkillNet.Api.Repositories;

public class MessageRepository : GenericRepository<Message>, IMessageRepository
{
    public MessageRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    public async Task<IEnumerable<Message>> GetConversationMessagesAsync(int conversationId)
    {
        return await _context.Messages
            .Include(m => m.Sender)
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.SentAt)
            .ToListAsync();
    }
    
    public async Task<IEnumerable<Conversation>> GetUserConversationsAsync(string userId)
    {
        return await _context.Conversations
            .Include(c => c.Participants)
                .ThenInclude(p => p.User)
            .Include(c => c.Messages.OrderByDescending(m => m.SentAt).Take(1))
                .ThenInclude(m => m.Sender)
            .Where(c => c.Participants.Any(p => p.UserId == userId))
            .OrderByDescending(c => c.UpdatedAt)
            .ToListAsync();
    }
}
