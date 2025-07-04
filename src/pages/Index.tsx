import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Award, MapPin, Calculator, Brain, Zap, Target, MessageCircle, Newspaper, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CivicChatbot from '@/components/CivicChatbot';
import NewsExplainer from '@/components/NewsExplainer';
import DebateForum from '@/components/DebateForum';

const Index = () => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isNewsExplainerOpen, setIsNewsExplainerOpen] = useState(false);
  const [isDebateForumOpen, setIsDebateForumOpen] = useState(false);

  const features = [
    {
      icon: <Calculator className="h-8 w-8 text-violet-600" />,
      title: "Budget Simulator",
      description: "Allocate city budgets and see the real impact of your decisions on community services.",
      action: () => navigate('/budget-simulator'),
      badge: "Interactive"
    },
    {
      icon: <Brain className="h-8 w-8 text-pink-600" />,
      title: "Rights Quiz",
      description: "Test your knowledge of constitutional rights and democratic principles.",
      action: () => navigate('/quiz'),
      badge: "Adaptive"
    },
    {
      icon: <MapPin className="h-8 w-8 text-purple-600" />,
      title: "Local Governance",
      description: "Explore how local governments work worldwide and get involved in your community.",
      action: () => navigate('/local-gov'),
      badge: "Global"
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: "Achievements",
      description: "Earn badges and track your civic education journey.",
      action: () => navigate('/progress'),
      badge: "Gamified"
    },
    {
      icon: <Newspaper className="h-8 w-8 text-blue-600" />,
      title: "News Explainer",
      description: "Break down complex news and government decisions into easy-to-understand explanations.",
      action: () => setIsNewsExplainerOpen(true),
      badge: "AI-Powered"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-600" />,
      title: "Debate Forum",
      description: "Participate in structured debates on civic issues and vote on the best arguments.",
      action: () => setIsDebateForumOpen(true),
      badge: "Community"
    }
  ];

  const stats = [
    { number: "10K+", label: "Students Learning" },
    { number: "150+", label: "Countries Covered" },
    { number: "98%", label: "Engagement Rate" },
    { number: "500+", label: "Civic Topics" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-violet-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-violet-600 to-pink-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                CivicQuest
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" onClick={() => navigate('/quiz')} className="hover:bg-violet-50">Learn</Button>
              <Button variant="ghost" onClick={() => navigate('/progress')} className="hover:bg-violet-50">Progress</Button>
              <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-violet-100 text-violet-800 border-violet-200">
              🏛️ AI-Powered Civic Education
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Master Civic Education
              <br />
              Through Interactive Learning
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover how government works worldwide, understand your rights, and become an engaged citizen through 
              personalized simulations, quizzes, and real-world scenarios with AI-powered assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/budget-simulator')}
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 rounded-xl border-2 border-violet-200 hover:bg-violet-50 transition-all duration-300"
                onClick={() => navigate('/quiz')}
              >
                <Target className="mr-2 h-5 w-5" />
                Take Quiz
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-pulse">
          <div className="w-20 h-20 bg-violet-100 rounded-full opacity-50"></div>
        </div>
        <div className="absolute top-40 right-10 animate-pulse delay-1000">
          <div className="w-16 h-16 bg-pink-100 rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm border-y border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              Interactive Learning Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Engage with civic concepts through hands-on simulations, AI assistance, and community discussions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-violet-200 bg-white/80 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={feature.action}
              >
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-r from-violet-50 to-pink-50 group-hover:from-violet-100 group-hover:to-pink-100 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <Badge className="mb-2 bg-gradient-to-r from-violet-100 to-pink-100 text-violet-800 border-0">
                    {feature.badge}
                  </Badge>
                  <CardTitle className="text-xl group-hover:text-violet-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Become an Informed Citizen?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students already learning about democracy, governance, and their rights worldwide
          </p>
          <Button 
            size="lg" 
            className="bg-white text-violet-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/budget-simulator')}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Begin Your Civic Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-violet-600 to-pink-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">CivicQuest</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 CivicQuest. Empowering the next generation of global citizens.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 z-40"
        onClick={() => setIsChatbotOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Components */}
      <CivicChatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)}
        context="civic education platform"
      />
      
      <NewsExplainer 
        isOpen={isNewsExplainerOpen} 
        onClose={() => setIsNewsExplainerOpen(false)}
      />
      
      <DebateForum 
        isOpen={isDebateForumOpen} 
        onClose={() => setIsDebateForumOpen(false)}
      />
    </div>
  );
};

export default Index;
