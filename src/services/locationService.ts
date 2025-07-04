
// Mock global cities database - in a real app, this would be a comprehensive API
const globalCities = [
  // North America
  { name: 'New York', country: 'United States', continent: 'North America', population: '8.3M' },
  { name: 'Los Angeles', country: 'United States', continent: 'North America', population: '4M' },
  { name: 'Chicago', country: 'United States', continent: 'North America', population: '2.7M' },
  { name: 'Toronto', country: 'Canada', continent: 'North America', population: '2.9M' },
  { name: 'Vancouver', country: 'Canada', continent: 'North America', population: '675K' },
  { name: 'Mexico City', country: 'Mexico', continent: 'North America', population: '9.2M' },
  
  // South America
  { name: 'São Paulo', country: 'Brazil', continent: 'South America', population: '12.3M' },
  { name: 'Rio de Janeiro', country: 'Brazil', continent: 'South America', population: '6.7M' },
  { name: 'Buenos Aires', country: 'Argentina', continent: 'South America', population: '3M' },
  { name: 'Lima', country: 'Peru', continent: 'South America', population: '10M' },
  { name: 'Bogotá', country: 'Colombia', continent: 'South America', population: '7.4M' },
  
  // Europe
  { name: 'London', country: 'United Kingdom', continent: 'Europe', population: '9M' },
  { name: 'Paris', country: 'France', continent: 'Europe', population: '2.1M' },
  { name: 'Berlin', country: 'Germany', continent: 'Europe', population: '3.7M' },
  { name: 'Madrid', country: 'Spain', continent: 'Europe', population: '3.3M' },
  { name: 'Rome', country: 'Italy', continent: 'Europe', population: '2.9M' },
  { name: 'Amsterdam', country: 'Netherlands', continent: 'Europe', population: '873K' },
  { name: 'Stockholm', country: 'Sweden', continent: 'Europe', population: '975K' },
  { name: 'Vienna', country: 'Austria', continent: 'Europe', population: '1.9M' },
  { name: 'Prague', country: 'Czech Republic', continent: 'Europe', population: '1.3M' },
  { name: 'Barcelona', country: 'Spain', continent: 'Europe', population: '1.6M' },
  
  // Asia
  { name: 'Tokyo', country: 'Japan', continent: 'Asia', population: '14M' },
  { name: 'Shanghai', country: 'China', continent: 'Asia', population: '24M' },
  { name: 'Beijing', country: 'China', continent: 'Asia', population: '21M' },
  { name: 'Mumbai', country: 'India', continent: 'Asia', population: '20M' },
  { name: 'Delhi', country: 'India', continent: 'Asia', population: '30M' },
  { name: 'Seoul', country: 'South Korea', continent: 'Asia', population: '9.7M' },
  { name: 'Singapore', country: 'Singapore', continent: 'Asia', population: '5.9M' },
  { name: 'Bangkok', country: 'Thailand', continent: 'Asia', population: '10.5M' },
  { name: 'Manila', country: 'Philippines', continent: 'Asia', population: '13.5M' },
  { name: 'Jakarta', country: 'Indonesia', continent: 'Asia', population: '10.6M' },
  { name: 'Kuala Lumpur', country: 'Malaysia', continent: 'Asia', population: '1.8M' },
  { name: 'Hong Kong', country: 'Hong Kong', continent: 'Asia', population: '7.5M' },
  
  // Africa
  { name: 'Lagos', country: 'Nigeria', continent: 'Africa', population: '15M' },
  { name: 'Cairo', country: 'Egypt', continent: 'Africa', population: '20M' },
  { name: 'Johannesburg', country: 'South Africa', continent: 'Africa', population: '4.4M' },
  { name: 'Cape Town', country: 'South Africa', continent: 'Africa', population: '4.6M' },
  { name: 'Casablanca', country: 'Morocco', continent: 'Africa', population: '3.4M' },
  { name: 'Nairobi', country: 'Kenya', continent: 'Africa', population: '4.4M' },
  { name: 'Accra', country: 'Ghana', continent: 'Africa', population: '2.3M' },
  
  // Oceania
  { name: 'Sydney', country: 'Australia', continent: 'Oceania', population: '5.3M' },
  { name: 'Melbourne', country: 'Australia', continent: 'Oceania', population: '5M' },
  { name: 'Brisbane', country: 'Australia', continent: 'Oceania', population: '2.6M' },
  { name: 'Perth', country: 'Australia', continent: 'Oceania', population: '2.1M' },
  { name: 'Auckland', country: 'New Zealand', continent: 'Oceania', population: '1.7M' },
  { name: 'Wellington', country: 'New Zealand', continent: 'Oceania', population: '418K' }
];

export const searchLocations = (query: string) => {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  return globalCities
    .filter(city => 
      city.name.toLowerCase().includes(lowerQuery) || 
      city.country.toLowerCase().includes(lowerQuery)
    )
    .sort((a, b) => {
      // Prioritize exact matches at the beginning
      const aStartsWith = a.name.toLowerCase().startsWith(lowerQuery);
      const bStartsWith = b.name.toLowerCase().startsWith(lowerQuery);
      
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      // Then sort alphabetically
      return a.name.localeCompare(b.name);
    });
};

export const getLocationDetails = async (locationData: any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate realistic mock data based on location
  const mockDetails = {
    name: locationData.name,
    country: locationData.country,
    continent: locationData.continent,
    population: locationData.population,
    budget: generateBudget(locationData.population),
    leader: generateLeaderTitle(locationData.country),
    nextElection: generateNextElection(),
    departments: generateDepartments(locationData.country),
    issues: generateIssues(locationData.continent),
    meetings: generateMeetings()
  };

  return mockDetails;
};

const generateBudget = (population: string) => {
  const popNum = parseFloat(population.replace(/[^\d.]/g, ''));
  if (popNum > 10) return `$${Math.round(popNum * 2)}B`;
  if (popNum > 5) return `$${Math.round(popNum * 1.5)}B`;
  if (popNum > 1) return `$${Math.round(popNum * 800)}M`;
  return `$${Math.round(popNum * 400)}M`;
};

const generateLeaderTitle = (country: string) => {
  const titles = {
    'United States': 'Mayor',
    'Canada': 'Mayor',
    'United Kingdom': 'Lord Mayor',
    'France': 'Mayor',
    'Germany': 'Bürgermeister',
    'Japan': 'Mayor',
    'Australia': 'Lord Mayor',
    'Brazil': 'Prefeito',
    'China': 'Mayor',
    'India': 'Mayor'
  };
  return titles[country] || 'Mayor';
};

const generateNextElection = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = ['2024', '2025', '2026'];
  return `${months[Math.floor(Math.random() * months.length)]} ${years[Math.floor(Math.random() * years.length)]}`;
};

const generateDepartments = (country: string) => {
  const baseDepartments = [
    { name: 'City Planning', description: 'Urban development and zoning', contact: 'planning@city.gov' },
    { name: 'Public Works', description: 'Infrastructure maintenance', contact: 'works@city.gov' },
    { name: 'Parks & Recreation', description: 'Community facilities and events', contact: 'parks@city.gov' },
    { name: 'Public Safety', description: 'Emergency services coordination', contact: 'safety@city.gov' }
  ];
  
  // Add region-specific departments
  if (['United States', 'Canada'].includes(country)) {
    baseDepartments.push({ name: 'Water & Utilities', description: 'Municipal utilities management', contact: 'utilities@city.gov' });
  }
  
  return baseDepartments;
};

const generateIssues = (continent: string) => {
  const globalIssues = [
    { title: 'Climate Action Plan', description: 'Implementing sustainable city initiatives', status: 'Active' },
    { title: 'Public Transit Expansion', description: 'Improving urban mobility options', status: 'Planning' },
    { title: 'Affordable Housing Initiative', description: 'Addressing housing accessibility', status: 'Active' }
  ];
  
  // Add continent-specific issues
  const continentIssues = {
    'Asia': [{ title: 'Smart City Technology', description: 'Digital infrastructure modernization', status: 'Active' }],
    'Europe': [{ title: 'Heritage Preservation', description: 'Protecting historical districts', status: 'Active' }],
    'North America': [{ title: 'Infrastructure Renewal', description: 'Upgrading aging infrastructure', status: 'Planning' }],
    'Africa': [{ title: 'Urban Development', description: 'Managing rapid city growth', status: 'Active' }],
    'South America': [{ title: 'Economic Development', description: 'Promoting local business growth', status: 'Active' }],
    'Oceania': [{ title: 'Environmental Protection', description: 'Preserving natural resources', status: 'Active' }]
  };
  
  return [...globalIssues, ...(continentIssues[continent] || [])];
};

const generateMeetings = () => {
  return [
    { title: 'City Council Meeting', date: 'Jan 15, 2024', time: '7:00 PM', location: 'City Hall' },
    { title: 'Budget Committee', date: 'Jan 22, 2024', time: '6:30 PM', location: 'Council Chambers' },
    { title: 'Public Forum', date: 'Feb 5, 2024', time: '7:30 PM', location: 'Community Center' }
  ];
};
