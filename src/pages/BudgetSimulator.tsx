
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, DollarSign, Users, Building, Leaf, ShieldCheck, GraduationCap, Heart, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const BudgetSimulator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const totalBudget = 1000000; // $1M city budget
  
  const [allocations, setAllocations] = useState({
    education: 25,
    healthcare: 20,
    infrastructure: 20,
    environment: 10,
    publicSafety: 15,
    socialServices: 10
  });

  const [citizenSatisfaction, setCitizenSatisfaction] = useState(75);
  const [scenario, setScenario] = useState(null);

  const budgetCategories = [
    {
      key: 'education',
      name: 'Education',
      icon: <GraduationCap className="h-5 w-5" />,
      color: 'bg-blue-500',
      description: 'Schools, teachers, educational programs',
      impact: 'Student performance and future workforce'
    },
    {
      key: 'healthcare',
      name: 'Healthcare',
      icon: <Heart className="h-5 w-5" />,
      color: 'bg-red-500',
      description: 'Hospitals, clinics, public health programs',
      impact: 'Community health and wellness'
    },
    {
      key: 'infrastructure',
      name: 'Infrastructure',
      icon: <Building className="h-5 w-5" />,
      color: 'bg-gray-500',
      description: 'Roads, bridges, utilities, maintenance',
      impact: 'Economic growth and daily life quality'
    },
    {
      key: 'environment',
      name: 'Environment',
      icon: <Leaf className="h-5 w-5" />,
      color: 'bg-green-500',
      description: 'Parks, recycling, clean energy initiatives',
      impact: 'Long-term sustainability and air quality'
    },
    {
      key: 'publicSafety',
      name: 'Public Safety',
      icon: <ShieldCheck className="h-5 w-5" />,
      color: 'bg-yellow-500',
      description: 'Police, fire department, emergency services',
      impact: 'Crime rates and emergency response'
    },
    {
      key: 'socialServices',
      name: 'Social Services',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-purple-500',
      description: 'Housing assistance, job programs, senior care',
      impact: 'Social equity and community support'
    }
  ];

  const scenarios = [
    {
      id: 1,
      title: "Economic Recession",
      description: "The city's revenue has decreased by 20%. How will you adjust the budget?",
      budgetMultiplier: 0.8
    },
    {
      id: 2,
      title: "Natural Disaster",
      description: "A flood has damaged infrastructure. Emergency funding is needed.",
      budgetMultiplier: 1.0,
      emergencyNeed: 'infrastructure'
    },
    {
      id: 3,
      title: "Population Growth",
      description: "The city has grown by 15%. More services are needed across all areas.",
      budgetMultiplier: 1.15
    }
  ];

  useEffect(() => {
    // Calculate citizen satisfaction based on balanced allocation
    const totalAllocation = Object.values(allocations).reduce((sum, val) => sum + val, 0);
    if (totalAllocation !== 100) return;

    // Ideal balanced allocation
    const ideal = { education: 25, healthcare: 20, infrastructure: 20, environment: 15, publicSafety: 15, socialServices: 5 };
    
    let satisfaction = 100;
    Object.keys(allocations).forEach(key => {
      const diff = Math.abs(allocations[key] - ideal[key]);
      satisfaction -= diff * 0.5;
    });
    
    setCitizenSatisfaction(Math.max(0, Math.min(100, satisfaction)));
  }, [allocations]);

  const handleAllocationChange = (category, value) => {
    setAllocations(prev => ({
      ...prev,
      [category]: value[0]
    }));
  };

  const getTotalAllocation = () => {
    return Object.values(allocations).reduce((sum, val) => sum + val, 0);
  };

  const getCategoryAmount = (category) => {
    return Math.round((allocations[category] / 100) * totalBudget);
  };

  const submitBudget = () => {
    const total = getTotalAllocation();
    if (total !== 100) {
      toast({
        title: "Budget Incomplete",
        description: `Your budget allocates ${total}%. It must equal exactly 100%.`,
        variant: "destructive"
      });
      return;
    }

    const satisfactionLevel = citizenSatisfaction >= 80 ? "excellent" : 
                            citizenSatisfaction >= 60 ? "good" : 
                            citizenSatisfaction >= 40 ? "fair" : "poor";

    toast({
      title: "Budget Submitted!",
      description: `Citizen satisfaction: ${Math.round(citizenSatisfaction)}% (${satisfactionLevel})`,
    });
  };

  const loadScenario = (scenarioData) => {
    setScenario(scenarioData);
    toast({
      title: "New Scenario",
      description: scenarioData.description,
    });
  };

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
                  City Budget Simulator
                </h1>
                <p className="text-gray-600">Allocate $1,000,000 across city departments</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Citizen Satisfaction</div>
                <div className="text-2xl font-bold text-green-600">{Math.round(citizenSatisfaction)}%</div>
              </div>
              <Button onClick={submitBudget} className="bg-gradient-to-r from-blue-600 to-green-600">
                Submit Budget
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Budget Allocation */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Budget Allocation</span>
                </CardTitle>
                <CardDescription>
                  Drag the sliders to allocate your budget. Total must equal 100%.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {budgetCategories.map((category) => (
                  <div key={category.key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${category.color} text-white`}>
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{allocations[category.key]}%</div>
                        <div className="text-sm text-gray-600">
                          ${getCategoryAmount(category.key).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Slider
                      value={[allocations[category.key]]}
                      onValueChange={(value) => handleAllocationChange(category.key, value)}
                      max={50}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500">
                      Impact: {category.impact}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Allocation:</span>
                    <span className={`font-bold text-lg ${getTotalAllocation() === 100 ? 'text-green-600' : 'text-red-600'}`}>
                      {getTotalAllocation()}%
                    </span>
                  </div>
                  <Progress value={getTotalAllocation()} className="mt-2" />
                </div>
              </CardContent>
            </Card>

            {/* Scenarios */}
            <Card>
              <CardHeader>
                <CardTitle>Challenge Scenarios</CardTitle>
                <CardDescription>
                  Test your budgeting skills with real-world challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {scenarios.map((scenarioData) => (
                    <Card key={scenarioData.id} className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => loadScenario(scenarioData)}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{scenarioData.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {scenarioData.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm" className="w-full">
                          Load Scenario
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Dashboard */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Impact</CardTitle>
                <CardDescription>See how your decisions affect the city</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Citizen Satisfaction</span>
                    <Badge variant={citizenSatisfaction >= 70 ? "default" : "destructive"}>
                      {Math.round(citizenSatisfaction)}%
                    </Badge>
                  </div>
                  <Progress value={citizenSatisfaction} />
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Key Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Education Quality</span>
                      <span className={allocations.education >= 20 ? 'text-green-600' : 'text-red-600'}>
                        {allocations.education >= 20 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Public Safety</span>
                      <span className={allocations.publicSafety >= 12 ? 'text-green-600' : 'text-red-600'}>
                        {allocations.publicSafety >= 12 ? 'Adequate' : 'At Risk'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Infrastructure</span>
                      <span className={allocations.infrastructure >= 15 ? 'text-green-600' : 'text-red-600'}>
                        {allocations.infrastructure >= 15 ? 'Well Maintained' : 'Deteriorating'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Environmental Health</span>
                      <span className={allocations.environment >= 8 ? 'text-green-600' : 'text-red-600'}>
                        {allocations.environment >= 8 ? 'Improving' : 'Declining'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {scenario && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-800">Active Scenario</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium text-orange-800">{scenario.title}</h4>
                  <p className="text-sm text-orange-700 mt-1">{scenario.description}</p>
                  {scenario.budgetMultiplier !== 1.0 && (
                    <Badge className="mt-2 bg-orange-100 text-orange-800">
                      Budget: ${Math.round(totalBudget * scenario.budgetMultiplier).toLocaleString()}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>• Understand budget trade-offs</div>
                <div>• Learn about municipal services</div>
                <div>• Practice democratic decision-making</div>
                <div>• Explore citizen needs and priorities</div>
                <div>• Experience public administration challenges</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSimulator;
