import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award, Trophy, Star, Target, Zap, BookOpen, Users, Brain, Calendar, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgressPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('overview');

  // Reset to new user state - in a real app with Supabase, this would be user-specific
  const userStats = {
    totalPoints: 0,
    level: 1,
    streak: 0,
    completedModules: 0,
    quizzesCompleted: 0,
    averageScore: 0,
    timeSpent: '0 hours',
    badges: 0
  };

  const achievements = [
    { 
      id: 1, 
      name: 'First Steps', 
      description: 'Complete your first quiz',
      icon: <Brain className="h-6 w-6" />,
      earned: false,
      points: 100,
      rarity: 'Common'
    },
    { 
      id: 2, 
      name: 'Budget Beginner', 
      description: 'Try the budget simulator',
      icon: <Target className="h-6 w-6" />,
      earned: false,
      points: 150,
      rarity: 'Common'
    },
    { 
      id: 3, 
      name: 'Democracy Explorer', 
      description: 'Complete an interactive learning module',
      icon: <Award className="h-6 w-6" />,
      earned: false,
      points: 200,
      rarity: 'Uncommon'
    },
    { 
      id: 4, 
      name: 'Quiz Master', 
      description: 'Complete 10 quizzes with 80%+ accuracy',
      icon: <Zap className="h-6 w-6" />,
      earned: false,
      points: 300,
      rarity: 'Uncommon'
    },
    { 
      id: 5, 
      name: 'Local Leader', 
      description: 'Explore government of 5 different cities',
      icon: <Users className="h-6 w-6" />,
      earned: false,
      points: 400,
      rarity: 'Rare'
    },
    { 
      id: 6, 
      name: 'Civic Scholar', 
      description: 'Reach level 10 and earn 5000 points',
      icon: <Trophy className="h-6 w-6" />,
      earned: false,
      points: 1000,
      rarity: 'Legendary'
    }
  ];

  const recentActivity = [
    { date: 'Today', activity: 'Welcome to Civic Education!', points: 0, type: 'welcome' }
  ];

  const learningPath = [
    { module: 'Introduction to Democracy', status: 'available', progress: 0 },
    { module: 'Constitutional Rights', status: 'locked', progress: 0 },
    { module: 'Branches of Government', status: 'locked', progress: 0 },
    { module: 'Local Government Basics', status: 'locked', progress: 0 },
    { module: 'Budget and Economics', status: 'locked', progress: 0 },
    { module: 'Electoral Process', status: 'locked', progress: 0 },
    { module: 'Advanced Civic Engagement', status: 'locked', progress: 0 }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'quiz': return <Brain className="h-4 w-4" />;
      case 'simulation': return <Target className="h-4 w-4" />;
      case 'achievement': return <Award className="h-4 w-4" />;
      case 'exploration': return <Users className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-800';
      case 'Uncommon': return 'bg-green-100 text-green-800';
      case 'Rare': return 'bg-blue-100 text-blue-800';
      case 'Legendary': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const levelProgress = 0; // New user starts at 0%
  const nextLevelPoints = 500; // Points needed for level 2

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Your Progress
                </h1>
                <p className="text-gray-600">Start your civic education journey</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Level {userStats.level}</div>
                <div className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notice for new users */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-amber-800">
              <AlertCircle className="h-5 w-5" />
              <div>
                <p className="font-medium">Welcome to Civic Education!</p>
                <p className="text-sm">Your progress will be tracked as you complete activities. Connect to Supabase for personalized, persistent progress tracking across devices.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600">Level {userStats.level}</div>
              <div className="text-sm text-gray-600">Getting Started</div>
              <Progress value={levelProgress} className="mt-2" />
              <div className="text-xs text-gray-500 mt-1">{nextLevelPoints} to next level</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{userStats.streak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">--%</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{userStats.badges}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Achievements */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Achievements to Unlock</span>
                </CardTitle>
                <CardDescription>Complete activities to earn badges and recognition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className="border rounded-lg p-4 bg-gray-50 opacity-60"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-gray-200 text-gray-400">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-500">
                              {achievement.name}
                            </h4>
                            <Badge className={getRarityColor(achievement.rarity)}>
                              {achievement.rarity}
                            </Badge>
                          </div>
                          <p className="text-sm mt-1 text-gray-400">
                            {achievement.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-medium text-gray-400">
                              +{achievement.points} points
                            </span>
                            <Badge className="bg-gray-100 text-gray-500">
                              Locked
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Path */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Learning Path</span>
                </CardTitle>
                <CardDescription>Your journey through civic education modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPath.map((module, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        module.status === 'available' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${module.status === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>
                            {module.module}
                          </h4>
                          <Badge variant={module.status === 'available' ? 'secondary' : 'outline'}>
                            {module.status === 'available' ? 'Available' : 'Locked'}
                          </Badge>
                        </div>
                        <Progress value={module.progress} className="mt-2" />
                        <div className="text-xs text-gray-500 mt-1">{module.progress}% complete</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                      <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg text-blue-600">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.activity}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500">{activity.date}</p>
                          {activity.points > 0 && (
                            <Badge className="bg-green-100 text-green-800">
                              +{activity.points}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center text-gray-500 text-sm pt-4">
                    Start learning to see your activity here!
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Start Learning</CardTitle>
                <CardDescription>Begin your civic education journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-green-600" 
                  onClick={() => navigate('/quiz')}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Take Your First Quiz
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/budget-simulator')}
                >
                  <Target className="mr-2 h-4 w-4" />
                  Try Budget Simulator
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/local-gov')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Explore Local Gov
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
