using SkillNet.Api.Models;

namespace SkillNet.Api.Repositories;

public interface IMessageRepository : IGenericRepository<Message>
{
    Task<IEnumerable<Message>> GetConversationMessagesAsync(int conversationId);
    Task<IEnumerable<Conversation>> GetUserConversationsAsync(string userId);
}
