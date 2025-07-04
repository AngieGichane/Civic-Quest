import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare, ThumbsUp, Award, Users, Plus, Send, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Argument {
  id: string;
  author: string;
  text: string;
  votes: number;
  badges: string[];
  timestamp: Date;
}

interface DebateTopic {
  id: string;
  title: string;
  question: string;
  category: string;
  arguments: Argument[];
  totalParticipants: number;
}

interface DebateForumProps {
  isOpen: boolean;
  onClose: () => void;
}

const DebateForum: React.FC<DebateForumProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState<DebateTopic | null>(null);
  const [newArgument, setNewArgument] = useState('');
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [topics, setTopics] = useState<DebateTopic[]>([
    {
      id: '1',
      title: 'Infrastructure Investment',
      question: 'Should taxes be increased to improve infrastructure?',
      category: 'Local Policy',
      totalParticipants: 24,
      arguments: [
        {
          id: '1a',
          author: 'Alex_Student',
          text: 'Yes, because better roads and bridges make everyone safer and help the economy grow. When businesses can transport goods easily, they create more jobs.',
          votes: 12,
          badges: ['Well Explained', 'Strong Argument'],
          timestamp: new Date('2024-01-10')
        },
        {
          id: '1b',
          author: 'Sam_Civic',
          text: 'I think we should look at spending current tax money more efficiently before asking for more. Maybe we can reallocate funds from other areas.',
          votes: 8,
          badges: ['Thoughtful'],
          timestamp: new Date('2024-01-11')
        }
      ]
    },
    {
      id: '2',
      title: 'School Funding',
      question: 'Should communities vote on how school budgets are spent?',
      category: 'Education',
      totalParticipants: 18,
      arguments: [
        {
          id: '2a',
          author: 'Jordan_Future',
          text: 'Absolutely! Students and parents should have a say in how education money is used. We know what we need most - newer textbooks, technology, or better lunch programs.',
          votes: 15,
          badges: ['Student Voice', 'Well Explained'],
          timestamp: new Date('2024-01-12')
        }
      ]
    },
    {
      id: '3',
      title: 'Environmental Policy',
      question: 'Should young people have more say in environmental policies?',
      category: 'Environment',
      totalParticipants: 31,
      arguments: [
        {
          id: '3a',
          author: 'Green_Teen',
          text: 'Yes! We\'re the ones who will live with the consequences of today\'s environmental decisions. Our voices matter because it\'s our future that\'s at stake.',
          votes: 22,
          badges: ['Passionate', 'Strong Argument', 'Future Focused'],
          timestamp: new Date('2024-01-13')
        }
      ]
    }
  ]);

  const handleVote = (argumentId: string) => {
    if (!selectedTopic) return;
    
    setTopics(prevTopics => 
      prevTopics.map(topic => 
        topic.id === selectedTopic.id 
          ? {
              ...topic,
              arguments: topic.arguments.map(arg => 
                arg.id === argumentId 
                  ? { ...arg, votes: arg.votes + 1 }
                  : arg
              )
            }
          : topic
      )
    );

    // Update selected topic to reflect the change
    setSelectedTopic(prevSelected => 
      prevSelected ? {
        ...prevSelected,
        arguments: prevSelected.arguments.map(arg => 
          arg.id === argumentId 
            ? { ...arg, votes: arg.votes + 1 }
            : arg
        )
      } : null
    );

    toast({
      title: "Vote Recorded!",
      description: "Thank you for participating in the discussion.",
    });
  };

  const handleSubmitArgument = () => {
    if (!newArgument.trim() || !selectedTopic) {
      toast({
        title: "Missing Information",
        description: "Please enter your argument before submitting.",
        variant: "destructive"
      });
      return;
    }

    if (!userName.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter your username to participate.",
        variant: "destructive"
      });
      return;
    }
    
    const newArgumentObj: Argument = {
      id: `${selectedTopic.id}_${Date.now()}`,
      author: userName.trim(),
      text: newArgument.trim(),
      votes: 0,
      badges: ['New Voice'],
      timestamp: new Date()
    };

    // Update the topics array
    setTopics(prevTopics => 
      prevTopics.map(topic => 
        topic.id === selectedTopic.id 
          ? {
              ...topic,
              arguments: [...topic.arguments, newArgumentObj],
              totalParticipants: topic.totalParticipants + 1
            }
          : topic
      )
    );

    // Update selected topic to reflect the change
    setSelectedTopic(prevSelected => 
      prevSelected ? {
        ...prevSelected,
        arguments: [...prevSelected.arguments, newArgumentObj],
        totalParticipants: prevSelected.totalParticipants + 1
      } : null
    );

    setNewArgument('');
    
    toast({
      title: "Argument Added!",
      description: "Your voice has been added to the discussion. Others can now see and vote on your argument.",
    });
  };

  function getBadgeColor(badge: string) {
    const colors: Record<string, string> = {
      'Well Explained': 'bg-blue-100 text-blue-800',
      'Strong Argument': 'bg-green-100 text-green-800',
      'Thoughtful': 'bg-purple-100 text-purple-800',
      'Student Voice': 'bg-orange-100 text-orange-800',
      'Passionate': 'bg-red-100 text-red-800',
      'Future Focused': 'bg-indigo-100 text-indigo-800',
      'New Voice': 'bg-pink-100 text-pink-800'
    };
    return colors[badge] || 'bg-gray-100 text-gray-800';
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-y-auto bg-gradient-to-br from-violet-50 to-pink-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            Student Debate Forum
          </DialogTitle>
          <p className="text-gray-600">
            Join discussions about important civic issues. Share your opinions, vote on arguments, and earn badges for thoughtful participation.
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {!selectedTopic ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Active Discussions</h3>
                <Button
                  onClick={() => setShowNewTopicForm(true)}
                  className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Topic
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-lg transition-shadow border-2 border-violet-100 bg-gradient-to-br from-violet-50 to-pink-50 cursor-pointer" onClick={() => setSelectedTopic(topic)}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-violet-100 text-violet-700">{topic.category}</Badge>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-1" />
                          {topic.totalParticipants}
                        </div>
                      </div>
                      <CardTitle className="text-lg text-gray-800">{topic.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{topic.question}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {topic.arguments.length} arguments
                        </div>
                        <Button size="sm" variant="outline" className="border-violet-300 text-violet-700 hover:bg-violet-50">
                          Join Discussion
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setSelectedTopic(null)} className="border-violet-300 text-violet-700">
                  ← Back to Topics
                </Button>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {selectedTopic.totalParticipants} participants
                  </span>
                  <Badge className="bg-violet-100 text-violet-700">{selectedTopic.category}</Badge>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-violet-100 to-pink-100 border-2 border-violet-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{selectedTopic.title}</CardTitle>
                  <p className="text-gray-700 text-lg">{selectedTopic.question}</p>
                </CardHeader>
              </Card>

              <div className="space-y-4">
                {selectedTopic.arguments.map((argument) => (
                  <Card key={argument.id} className="border-2 border-violet-100 bg-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-violet-700">@{argument.author}</span>
                          <span className="text-sm text-gray-500">
                            {argument.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVote(argument.id)}
                          className="flex items-center space-x-1 border-green-300 text-green-700 hover:bg-green-50"
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>{argument.votes}</span>
                        </Button>
                      </div>
                      
                      <p className="text-gray-800 mb-3">{argument.text}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {argument.badges.map((badge, index) => (
                          <Badge key={index} className={`text-xs ${getBadgeColor(badge)}`}>
                            <Award className="h-3 w-3 mr-1" />
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Add Your Voice</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 p-2 rounded">
                    <AlertCircle className="h-4 w-4" />
                    <span>Note: Without Supabase integration, comments are only visible during this session.</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter your username..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="border-violet-200 focus:border-violet-400"
                    />
                    <Input
                      placeholder="Share your thoughts on this topic..."
                      value={newArgument}
                      onChange={(e) => setNewArgument(e.target.value)}
                      className="border-violet-200 focus:border-violet-400"
                    />
                    <Button
                      onClick={handleSubmitArgument}
                      className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Argument
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DebateForum;
