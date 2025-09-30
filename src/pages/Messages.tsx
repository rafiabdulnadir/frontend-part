import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Search } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'S',
    lastMessage: 'Thanks for the quick response!',
    time: '5m ago',
    unread: 2,
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'M',
    lastMessage: 'When can we schedule a call?',
    time: '1h ago',
    unread: 0,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'E',
    lastMessage: 'Perfect, see you then!',
    time: '3h ago',
    unread: 0,
  },
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [message, setMessage] = useState('');

  const mockMessages = [
    { id: 1, sender: 'them', text: 'Hi! I saw your profile', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Hello! How can I help you?', time: '10:32 AM' },
    { id: 3, sender: 'them', text: 'I need help with web development', time: '10:35 AM' },
    { id: 4, sender: 'me', text: "I'd be happy to help! What's your project about?", time: '10:36 AM' },
    { id: 5, sender: 'them', text: 'Thanks for the quick response!', time: '10:40 AM' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      console.log('Sending:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid h-[calc(100vh-200px)] grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* Conversations List */}
          <Card className="flex flex-col overflow-hidden">
            <div className="border-b border-border p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {mockConversations.map((conv) => (
                <motion.button
                  key={conv.id}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  onClick={() => setSelectedConversation(conv)}
                  className={
                    selectedConversation.id === conv.id
                      ? 'w-full border-b border-border bg-secondary p-4 text-left transition-colors'
                      : 'w-full border-b border-border p-4 text-left transition-colors'
                  }
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold">
                      {conv.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">{conv.name}</h3>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="flex flex-col lg:col-span-2">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold">
                  {selectedConversation.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConversation.name}</h3>
                  <p className="text-xs text-muted-foreground">Active now</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {mockMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === 'me'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="mt-1 text-xs opacity-70">{msg.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="border-t border-border p-4">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" variant="default">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Messages;
