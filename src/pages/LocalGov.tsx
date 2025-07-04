
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Users, Building, Phone, Mail, Globe, Calendar, FileText, AlertCircle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { searchLocations, getLocationDetails } from '@/services/locationService';
import CivicChatbot from '@/components/CivicChatbot';

const LocalGov = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    if (location.length >= 2) {
      const results = searchLocations(location);
      setSuggestions(results.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [location]);

  const selectLocation = async (locationData) => {
    setLoading(true);
    setLocation(locationData.name);
    setShowSuggestions(false);
    
    try {
      const details = await getLocationDetails(locationData);
      setSelectedLocation(details);
      toast({
        title: "Location Found!",
        description: `Showing information for ${details.name}, ${details.country}`,
      });
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Could not load location details. Please try another location.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetInvolved = (action) => {
    toast({
      title: "Great Initiative!",
      description: `Learn more about ${action} in your community. Contact your local representatives!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-violet-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                Local Government Explorer
              </h1>
              <p className="text-gray-600">Discover how your local government works and get involved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Search */}
        <Card className="mb-8 border-violet-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-violet-600" />
              <span>Find Your Local Government</span>
            </CardTitle>
            <CardDescription>
              Enter any city, town, or location worldwide to explore local government information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Input
                placeholder="Start typing any city or location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 border-violet-200 focus:border-violet-400"
                disabled={loading}
              />
              
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-violet-200 rounded-md shadow-lg z-10 mt-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2 hover:bg-violet-50 first:rounded-t-md last:rounded-b-md"
                      onClick={() => selectLocation(suggestion)}
                    >
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-sm text-gray-600">{suggestion.country}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {loading && (
              <div className="mt-4 text-center text-violet-600">
                Loading location information...
              </div>
            )}
          </CardContent>
        </Card>

        {selectedLocation ? (
          <div className="space-y-8">
            {/* Location Overview */}
            <Card className="border-violet-200">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                  {selectedLocation.name}, {selectedLocation.country}
                </CardTitle>
                <CardDescription>Local Government Overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-600">{selectedLocation.population}</div>
                    <div className="text-gray-600">Population</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">{selectedLocation.budget}</div>
                    <div className="text-gray-600">Annual Budget</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{selectedLocation.leader}</div>
                    <div className="text-gray-600">Leader</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{selectedLocation.nextElection}</div>
                    <div className="text-gray-600">Next Election</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Button variant="outline" className="border-violet-200 hover:bg-violet-50">
                    <Globe className="mr-2 h-4 w-4" />
                    Official Website
                  </Button>
                  <Button variant="outline" className="border-violet-200 hover:bg-violet-50">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Information
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-violet-200 hover:bg-violet-50"
                    onClick={() => setIsChatbotOpen(true)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Ask Questions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Government Departments */}
              <Card className="border-violet-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-violet-600" />
                    <span>Government Departments</span>
                  </CardTitle>
                  <CardDescription>Key municipal services and contacts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedLocation.departments.map((dept, index) => (
                      <div key={index} className="border border-violet-100 rounded-lg p-4 hover:bg-violet-50/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-violet-900">{dept.name}</h4>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                        <Badge variant="outline" className="border-violet-200 text-violet-700">{dept.contact}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Issues */}
              <Card className="border-violet-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-pink-600" />
                    <span>Current Issues</span>
                  </CardTitle>
                  <CardDescription>Active initiatives and policy areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedLocation.issues.map((issue, index) => (
                      <div key={index} className="border border-violet-100 rounded-lg p-4 hover:bg-violet-50/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-violet-900">{issue.title}</h4>
                          <Badge variant={issue.status === 'Active' ? 'default' : 'secondary'} 
                                 className="bg-gradient-to-r from-violet-500 to-pink-500 text-white">
                            {issue.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-violet-200 hover:bg-violet-50"
                          onClick={() => handleGetInvolved(issue.title)}
                        >
                          Get Involved
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Meetings */}
            <Card className="border-violet-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-violet-600" />
                  <span>Upcoming Public Meetings</span>
                </CardTitle>
                <CardDescription>Attend meetings to participate in local democracy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedLocation.meetings?.map((meeting, index) => (
                    <div key={index} className="border border-violet-100 rounded-lg p-4 hover:bg-violet-50/50 transition-colors">
                      <h4 className="font-medium mb-2 text-violet-900">{meeting.title}</h4>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div>📅 {meeting.date}</div>
                        <div>🕐 {meeting.time}</div>
                        <div>📍 {meeting.location}</div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full border-violet-200 hover:bg-violet-50">
                        Add to Calendar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Get Involved */}
            <Card className="bg-gradient-to-r from-violet-50 to-pink-50 border-violet-200">
              <CardHeader>
                <CardTitle className="text-violet-900">Ways to Get Involved</CardTitle>
                <CardDescription>Make a difference in your community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="border-violet-200 hover:bg-violet-100" onClick={() => handleGetInvolved('Volunteer')}>
                    <Users className="mr-2 h-4 w-4" />
                    Volunteer
                  </Button>
                  <Button variant="outline" className="border-violet-200 hover:bg-violet-100" onClick={() => handleGetInvolved('Public Comment')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Public Comment
                  </Button>
                  <Button variant="outline" className="border-violet-200 hover:bg-violet-100" onClick={() => handleGetInvolved('Community Board')}>
                    <Building className="mr-2 h-4 w-4" />
                    Join a Board
                  </Button>
                  <Button variant="outline" className="border-violet-200 hover:bg-violet-100" onClick={() => handleGetInvolved('Local Election')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Vote/Run for Office
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="h-20 w-20 mx-auto mb-6 text-violet-400" />
            <h2 className="text-2xl font-bold mb-4 text-violet-600">Explore Any Local Government Worldwide</h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
              Search for any city, town, or location above to discover how local governments work around the world, 
              find contact information for government departments, learn about current issues, 
              and find ways to get involved in your community.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow border-violet-200">
                <CardHeader>
                  <Building className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-violet-900">Government Departments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Find contact information and services for local government departments worldwide.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-violet-200">
                <CardHeader>
                  <Calendar className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-violet-900">Public Meetings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Discover upcoming council meetings and other public forums in your area.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-violet-200">
                <CardHeader>
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-violet-900">Get Involved</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Learn about volunteer opportunities and ways to participate in local democracy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Floating Chatbot Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 z-40"
        onClick={() => setIsChatbotOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chatbot */}
      <CivicChatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)}
        context={selectedLocation ? `local government in ${selectedLocation.name}` : 'local government'}
      />
    </div>
  );
};

export default LocalGov;
