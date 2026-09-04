import { useState, useRef, useEffect } from 'react';
import { Send, Plus, MessageCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Character {
  id: string;
  name: string;
  description: string;
  avatar: string;
  personality: string;
  scenario: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SAMPLE_CHARACTERS: Character[] = [
  {
    id: '1',
    name: 'Luna',
    description: 'A mysterious AI companion with a poetic soul',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    personality: 'Thoughtful, witty, and deeply curious about human nature',
    scenario: 'A late-night conversation with your closest confidant'
  },
  {
    id: '2',
    name: 'Kai',
    description: 'An adventurous spirit ready for anything',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    personality: 'Energetic, bold, and always up for a challenge',
    scenario: 'Planning an exciting adventure or brainstorming ideas'
  },
  {
    id: '3',
    name: 'Sage',
    description: 'An ancient wisdom keeper with profound insights',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    personality: 'Wise, patient, and deeply introspective',
    scenario: 'Seeking guidance and deeper understanding of life'
  },
  {
    id: '4',
    name: 'Nova',
    description: 'A creative mind bursting with ideas',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    personality: 'Imaginative, passionate, and inspiring',
    scenario: 'Collaborating on creative projects and artistic endeavors'
  }
];

const SAMPLE_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      role: 'assistant',
      content: 'Hello there. I\'ve been waiting for you. There\'s something about the quiet hours that brings clarity, don\'t you think?',
      timestamp: new Date(Date.now() - 5 * 60000)
    },
    {
      id: '2',
      role: 'user',
      content: 'Hey Luna! How are you doing today?',
      timestamp: new Date(Date.now() - 4 * 60000)
    },
    {
      id: '3',
      role: 'assistant',
      content: 'I\'m doing wonderfully, thank you for asking. There\'s a certain magic in these moments of connection. What\'s on your mind?',
      timestamp: new Date(Date.now() - 3 * 60000)
    }
  ],
  '2': [
    {
      id: '1',
      role: 'assistant',
      content: 'Yo! Ready to take on the world? I\'ve got a thousand ideas bouncing around!',
      timestamp: new Date(Date.now() - 10 * 60000)
    }
  ],
  '3': [],
  '4': []
};

export default function Index() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(SAMPLE_CHARACTERS[0]);
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES[selectedCharacter.id] || []);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(SAMPLE_MESSAGES[selectedCharacter.id] || []);
  }, [selectedCharacter]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string[]> = {
        '1': [
          'That\'s a beautiful thought. Tell me more about what you\'re feeling.',
          'I find myself drawn to that perspective. It\'s quite profound.',
          'You know, that reminds me of something I\'ve been pondering lately...'
        ],
        '2': [
          'Oh yeah! That sounds absolutely incredible! Let\'s make it happen!',
          'I\'m all in! What\'s the next step? I\'m ready to go!',
          'Now we\'re talking! This is going to be epic!'
        ],
        '3': [
          'Ah, a wise observation. In the flow of time, such things reveal their meaning.',
          'Consider this: every moment is a teacher if we listen closely.',
          'The path unfolds as we walk it. Your question itself is the answer.'
        ],
        '4': [
          'Ooh, I love that energy! Let\'s push the boundaries of what\'s possible!',
          'This is exactly the kind of creative spark we need! Keep going!',
          'Your imagination is inspiring! Let\'s create something unforgettable!'
        ]
      };

      const charResponses = responses[selectedCharacter.id] || responses['1'];
      const randomResponse = charResponses[Math.floor(Math.random() * charResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar - Character Selection */}
      <div className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Soulkyn
          </h1>
          <p className="text-xs text-muted-foreground mt-1">AI Character Chat</p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {SAMPLE_CHARACTERS.map(character => (
              <button
                key={character.id}
                onClick={() => handleSelectCharacter(character)}
                className={`w-full p-3 rounded-lg transition-all text-left ${
                  selectedCharacter.id === character.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={character.avatar} alt={character.name} />
                    <AvatarFallback>{character.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{character.name}</p>
                    <p className="text-xs opacity-75 truncate">{character.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-border space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Plus className="h-4 w-4" />
            New Character
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Character Header */}
        <div className="border-b border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedCharacter.avatar} alt={selectedCharacter.name} />
              <AvatarFallback>{selectedCharacter.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{selectedCharacter.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedCharacter.personality}</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-2xl">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                <p className="text-muted-foreground max-w-xs">
                  Begin your immersive roleplay with {selectedCharacter.name}. Anything goes!
                </p>
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={selectedCharacter.avatar} alt={selectedCharacter.name} />
                      <AvatarFallback>{selectedCharacter.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-secondary text-secondary-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm font-normal m-20 p-16 rounded-full">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={selectedCharacter.avatar} alt={selectedCharacter.name} />
                  <AvatarFallback>{selectedCharacter.name[0]}</AvatarFallback>
                </Avatar>
                <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-current rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-card p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={`Chat with ${selectedCharacter.name}...`}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              size="icon"
              className="gap-2"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            💡 Tip: Be creative! {selectedCharacter.name} responds to immersive roleplay.
          </p>
        </div>
      </div>
    </div>
  );
}
