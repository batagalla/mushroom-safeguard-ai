import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Search, Leaf, AlertCircle, FileText, Upload, StarIcon, Star } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mushroom Enthusiast",
      content: "This app saved me from a potential mistake while foraging. The quick identification gave me confidence in determining which mushrooms were safe to collect.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Amateur Forager",
      content: "The AI analysis is impressively accurate. I cross-referenced with my guidebooks and it was spot on every time. Definitely my go-to tool now when I'm out in the woods.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Hiking Guide",
      content: "I teach mushroom identification basics on my tours, and this app has become an essential tool. The clear warnings and detailed information help my clients learn safely.",
      rating: 4
    }
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

      {/* User Testimonials Section */}
      <section className="container px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">User Testimonials</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            See what our community of foragers and mushroom enthusiasts have to say about Mushroom SafeGuard.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
              <div className="mt-auto">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-mushroom-primary">{testimonial.role}</p>
              </div>
            </div>
          ))}
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
