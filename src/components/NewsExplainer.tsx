
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Lightbulb, Clock, MapPin, GraduationCap, X } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  relevance: string[];
  difficulty: 'elementary' | 'middle' | 'high';
  location: string;
  tags: string[];
}

interface NewsExplainerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsExplainer: React.FC<NewsExplainerProps> = ({ isOpen, onClose }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: 'City Council Approves New Park Budget',
      summary: 'Local government allocates $2M for new community park development',
      explanation: 'This means your city council (the people who make decisions for your city) decided to spend $2 million on building a new park. This money comes from taxes that people in your city pay. The council had to vote on whether this was a good use of the city\'s money compared to other needs like fixing roads or improving schools.',
      relevance: ['Local Government', 'Budget Planning', 'Community Services'],
      difficulty: 'elementary',
      location: 'Your City',
      tags: ['local-government', 'budget', 'community']
    },
    {
      id: '2',
      title: 'State Passes New Education Funding Bill',
      summary: 'Legislature increases school funding by 15% for next fiscal year',
      explanation: 'The state legislature (like a big council for your whole state) decided to give more money to schools - 15% more than last year. This could mean smaller class sizes, more supplies, or new programs at your school. The money comes from state taxes and will be divided among all the schools in your state.',
      relevance: ['State Government', 'Education Policy', 'Budget'],
      difficulty: 'middle',
      location: 'Your State',
      tags: ['education', 'state-government', 'funding']
    },
    {
      id: '3',
      title: 'Federal Infrastructure Investment Announced',
      summary: 'Government plans $50B investment in roads, bridges, and broadband',
      explanation: 'The federal government (which makes decisions for the whole country) is planning to spend $50 billion to fix and improve infrastructure. Infrastructure means the basic things we all need like roads to drive on, bridges to cross rivers, and internet connections. This is a big investment that will create jobs and make it easier for people to travel and communicate.',
      relevance: ['Federal Government', 'Infrastructure', 'Economic Policy'],
      difficulty: 'high',
      location: 'United States',
      tags: ['federal-government', 'infrastructure', 'economy']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'elementary': return 'bg-green-100 text-green-800';
      case 'middle': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-y-auto bg-gradient-to-br from-violet-50 to-pink-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            News Made Simple
          </DialogTitle>
          <p className="text-gray-600">
            Stay informed about government decisions that affect you. Click "Explain This" to break down complex news into easy-to-understand terms.
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNews.map((news) => (
              <Card key={news.id} className="hover:shadow-lg transition-shadow border-2 border-violet-100 bg-gradient-to-br from-violet-50 to-pink-50">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getDifficultyColor(news.difficulty)}>
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {news.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-violet-600 border-violet-300">
                      <MapPin className="h-3 w-3 mr-1" />
                      {news.location}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-gray-800">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{news.summary}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {news.relevance.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-violet-100 text-violet-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button
                    onClick={() => setSelectedNews(news)}
                    className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600"
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Explain This
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedNews && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-2xl bg-gradient-to-br from-violet-50 to-pink-50 border-2 border-violet-200">
                <CardHeader className="bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5" />
                    <span>Simple Explanation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">{selectedNews.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{selectedNews.explanation}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Why This Matters:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNews.relevance.map((item, index) => (
                          <Badge key={index} className="bg-violet-100 text-violet-700">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-violet-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          {selectedNews.difficulty} level
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {selectedNews.location}
                        </span>
                      </div>
                      <Button
                        onClick={() => setSelectedNews(null)}
                        variant="outline"
                        className="border-violet-300 text-violet-700 hover:bg-violet-50"
                      >
                        Close
                      </Button>
                    </div>
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

export default NewsExplainer;
