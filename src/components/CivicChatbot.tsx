
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Lightbulb, X, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'explanation' | 'guidance' | 'question' | 'followup';
  relatedTopic?: string;
}

interface CivicChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
}

const CivicChatbot: React.FC<CivicChatbotProps> = ({ isOpen, onClose, context }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm your civic education assistant${context ? ` for ${context}` : ''}. I can help explain government functions, guide you through activities, or answer any civic questions you have! Feel free to ask follow-up questions or explore different topics.`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'guidance'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: Record<string, { response: string; followups: string[] }> = {
    'budget': {
      response: "A government budget is like a family's spending plan! It shows how much money the government has and how they plan to spend it on things like schools, roads, hospitals, and parks. The budget process involves proposing, reviewing, and approving how public money will be used.",
      followups: ["How are budgets created?", "Who decides the budget?", "What if there's not enough money?"]
    },
    'taxes': {
      response: "Taxes are money that people and businesses pay to the government. Think of it like everyone chipping in to buy things we all use - like schools, roads, and firefighters. There are different types of taxes: income tax (from your salary), sales tax (when you buy things), and property tax (if you own a house).",
      followups: ["What are different types of taxes?", "How are tax rates decided?", "What happens if people don't pay taxes?"]
    },
    'voting': {
      response: "Voting is how citizens choose their leaders and make decisions about their community. It's like being part of a big group decision where everyone gets a say. When you turn 18, you'll be able to vote for president, senators, representatives, and local leaders like mayors.",
      followups: ["How does the voting process work?", "Who can vote?", "What is the electoral college?"]
    },
    'democracy': {
      response: "Democracy means 'rule by the people.' It's a system where everyone has a voice in how their country is run. People vote for leaders who make decisions on their behalf, and these leaders are accountable to the people. There are different types of democracy around the world!",
      followups: ["What are types of democracy?", "How is democracy different from other systems?", "What are democratic rights?"]
    },
    'constitution': {
      response: "A constitution is like a rulebook for a country. It explains what the government can and cannot do, and what rights people have. It's the most important law that all other laws must follow. The U.S. Constitution has been around since 1787 and includes the Bill of Rights!",
      followups: ["What's in the Bill of Rights?", "How can the Constitution be changed?", "Why is the Constitution important?"]
    },
    'mayor': {
      response: "A mayor is like the boss of a city or town. They help make decisions about local things like parks, roads, and city services. They work with a city council to make sure the community runs smoothly. Mayors are usually elected by the people who live in that city.",
      followups: ["What powers does a mayor have?", "How long do mayors serve?", "What's a city council?"]
    },
    'local government': {
      response: "Local government is the level of government closest to you! It includes your city council, mayor, and local departments that take care of things like parks, libraries, local roads, and community services in your area. This is where you can have the most direct impact as a citizen.",
      followups: ["How can I get involved locally?", "What services does local government provide?", "How is local government funded?"]
    },
    'elections': {
      response: "Elections are how we choose our leaders in a democracy. There are different types: presidential elections (every 4 years), congressional elections (every 2 years), and local elections (varies by location). Citizens research candidates and vote for who they think will do the best job.",
      followups: ["How often are elections held?", "What's a primary election?", "How do I register to vote?"]
    },
    'congress': {
      response: "Congress is the lawmaking branch of the U.S. government. It has two parts: the House of Representatives (435 members, 2-year terms) and the Senate (100 members, 6-year terms). Congress writes laws, controls government spending, and represents the people's interests.",
      followups: ["What's the difference between House and Senate?", "How does a bill become a law?", "Who are my representatives?"]
    },
    'president': {
      response: "The President is the leader of the executive branch and the head of state. They enforce laws, command the military, conduct foreign policy, and can sign or veto bills from Congress. The President serves 4-year terms and can only serve two terms total.",
      followups: ["What are the President's main duties?", "How is the President elected?", "What's the cabinet?"]
    }
  };

  const generateContextualResponse = (input: string, previousTopics: string[]) => {
    const lowerInput = input.toLowerCase();
    
    // Check for follow-up question indicators
    const followupIndicators = ['how', 'why', 'what', 'when', 'where', 'can you explain', 'tell me more', 'more about'];
    const isFollowup = followupIndicators.some(indicator => lowerInput.includes(indicator)) && previousTopics.length > 0;
    
    // Enhanced keyword matching with context
    for (const [keyword, data] of Object.entries(predefinedResponses)) {
      if (lowerInput.includes(keyword)) {
        const response = data.response;
        const relatedQuestions = data.followups;
        
        return {
          response,
          type: isFollowup ? 'followup' : 'explanation',
          relatedTopic: keyword,
          followupSuggestions: relatedQuestions
        };
      }
    }
    
    // Context-aware responses
    if (isFollowup && previousTopics.length > 0) {
      const lastTopic = previousTopics[previousTopics.length - 1];
      return {
        response: `That's a great follow-up question about ${lastTopic}! While I'd love to dive deeper, I encourage you to explore this topic further through your school resources or by asking a teacher. What other civic topics would you like to learn about?`,
        type: 'followup',
        relatedTopic: lastTopic,
        followupSuggestions: ['Tell me about voting', 'How does local government work?', 'What are taxes used for?']
      };
    }
    
    // General helpful response
    const generalTopics = ['voting', 'democracy', 'constitution', 'local government', 'taxes', 'elections'];
    const randomTopic = generalTopics[Math.floor(Math.random() * generalTopics.length)];
    
    return {
      response: `That's an interesting question! I'd be happy to help you explore civic topics. Try asking me about ${randomTopic}, or feel free to ask about any aspect of government, democracy, or civic participation that interests you!`,
      type: 'guidance',
      followupSuggestions: [`Tell me about ${randomTopic}`, 'How can young people get involved?', 'What is democracy?']
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Generate contextual response
    setTimeout(() => {
      const responseData = generateContextualResponse(inputMessage, conversationContext);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseData.response,
        sender: 'bot',
        timestamp: new Date(),
        type: responseData.type as any,
        relatedTopic: responseData.relatedTopic
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Update conversation context
      if (responseData.relatedTopic) {
        setConversationContext(prev => [...prev.slice(-2), responseData.relatedTopic!]);
      }
      
      // Add follow-up suggestions as quick reply options
      if (responseData.followupSuggestions && responseData.followupSuggestions.length > 0) {
        setTimeout(() => {
          const suggestionsMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "Here are some related questions you might find interesting:",
            sender: 'bot',
            timestamp: new Date(),
            type: 'guidance'
          };
          setMessages(prev => [...prev, suggestionsMessage]);
        }, 500);
      }
      
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Variable delay for more natural feel

    setInputMessage('');
  };

  const handleQuickReply = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([{
      id: '1',
      text: `Hi! I'm your civic education assistant${context ? ` for ${context}` : ''}. I can help explain government functions, guide you through activities, or answer any civic questions you have! Feel free to ask follow-up questions or explore different topics.`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'guidance'
    }]);
    setConversationContext([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col bg-gradient-to-br from-violet-50 to-pink-50 border-2 border-violet-200">
        <CardHeader className="flex-shrink-0 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <CardTitle>Civic Learning Assistant</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={clearConversation} className="text-white hover:bg-white/20">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                      : 'bg-white border border-violet-200 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-violet-500" />
                    )}
                    {message.sender === 'user' && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      {message.type && (
                        <Badge variant="outline" className="mt-2 text-xs border-violet-200">
                          {message.type === 'explanation' && <Lightbulb className="h-3 w-3 mr-1" />}
                          {message.type}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-violet-200 text-gray-800 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-violet-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-violet-200 p-4 bg-white/80">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about government, voting, taxes, or any civic topic..."
                className="flex-1 border-violet-200 focus:border-violet-400"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
                className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {conversationContext.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                Recent topics: {conversationContext.join(', ')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CivicChatbot;
