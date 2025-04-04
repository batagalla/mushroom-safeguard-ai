import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Search, Leaf, AlertCircle, FileText, Upload, MessageSquare } from 'lucide-react';
import api from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const navigate = useNavigate();
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentFeedback = async () => {
      try {
        setLoading(true);
        const response = await api.get('/feedback/recent');
        setRecentFeedback(response.data);
      } catch (error) {
        console.error('Failed to fetch recent feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentFeedback();
  }, []);

  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: 'AI Identification',
      description: 'Upload a photo of any mushroom and let our AI identify whether it\'s safe to eat or poisonous.',
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: 'Safety First',
      description: 'Get instant warnings about dangerous mushrooms to keep yourself and others safe.',
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Detailed Information',
      description: 'Learn about different mushroom species, their characteristics, and edibility status.',
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="mushroom-pattern">
        <div className="container px-4 py-16 md:py-24 lg:py-32">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center mb-4">
              <Leaf size={40} className="text-mushroom-primary mr-2" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Mushroom SafeGuard
              </h1>
            </div>
            <p className="max-w-[700px] text-lg text-muted-foreground mb-6">
              Quickly identify whether a mushroom is edible or poisonous using our AI-powered 
              image recognition technology. Stay safe while foraging!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/identify')} 
                className="bg-mushroom-primary hover:bg-mushroom-dark"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload & Identify
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Our AI-powered application makes mushroom identification safe and accessible to everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="rounded-full bg-mushroom-light p-4 mb-4 text-mushroom-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How To Use Section */}
      <section className="bg-muted py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">How To Use</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Three simple steps to identify if a mushroom is edible or poisonous.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-mushroom-primary text-white font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Take a Photo</h3>
              <p className="text-muted-foreground">
                Snap a clear photo of the mushroom you want to identify.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-mushroom-primary text-white font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Upload & Analyze</h3>
              <p className="text-muted-foreground">
                Upload the image to our platform for our AI to analyze.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-mushroom-primary text-white font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Get Results</h3>
              <p className="text-muted-foreground">
                Receive instant results on whether the mushroom is edible or poisonous.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/identify')} 
              className="bg-mushroom-primary hover:bg-mushroom-dark"
            >
              Start Identifying Now
            </Button>
          </div>
        </div>
      </section>

      {/* Recent User Feedback Section */}
      <section className="container px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Community Feedback</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            See what our users are saying about their mushroom identification experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))
          ) : recentFeedback.length === 0 ? (
            <div className="col-span-3 text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium mb-2">No feedback yet</h3>
              <p className="text-muted-foreground">
                Be the first to identify a mushroom and share your experience!
              </p>
            </div>
          ) : (
            recentFeedback.map((item) => (
              <div key={item._id} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-16 w-16 rounded-md overflow-hidden">
                    <img 
                      src={item.image?.url} 
                      alt="Mushroom" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.user?.name || "User"}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      item.image?.classification?.classification === 'edible' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.image?.classification?.classification || "Unclassified"}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-3">"{item.text}"</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/identify')}
          >
            Try Mushroom Identification
          </Button>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="container px-4 py-16">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-center mb-6">
            <AlertCircle size={28} className="text-mushroom-primary mr-2" />
            <h2 className="text-2xl font-bold">Important Safety Notice</h2>
          </div>
          <div className="bg-mushroom-light/50 border border-mushroom-primary/20 rounded-lg p-6 text-center">
            <p className="text-sm md:text-base">
              While our AI technology strives for accuracy, never rely solely on this app for mushroom consumption decisions. 
              Always consult with professional mycologists or field guides to confirm any identification. Many mushrooms have 
              poisonous look-alikes, and consumption of misidentified mushrooms can be fatal.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
