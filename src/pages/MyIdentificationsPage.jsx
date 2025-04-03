
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { useImage } from '@/context/ImageContext';
import { useFeedback } from '@/context/FeedbackContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, FileImage, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyIdentificationsPage = () => {
  const { currentUser } = useAuth();
  const { fetchUserImages, getUserImages, getImage } = useImage();
  const { getUserFeedback, fetchFeedback } = useFeedback();
  const [userImages, setUserImages] = useState([]);
  const [userFeedback, setUserFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser) {
        setLoading(true);
        // Fetch images and feedback
        await fetchUserImages();
        await fetchFeedback();
        
        const images = await getUserImages(currentUser.id);
        const feedback = await getUserFeedback(currentUser.id);
        
        setUserImages(images);
        setUserFeedback(feedback);
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [currentUser]);
  
  const handleImageClick = async (imageId) => {
    const result = await getImage(imageId);
    if (result.success) {
      setSelectedImage(result.image);
    }
  };
  
  const closeImageDetails = () => {
    setSelectedImage(null);
  };
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout>
      <section className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1">My Identifications & Feedback</h1>
            <p className="text-muted-foreground">
              Review all your mushroom identifications and submitted feedback.
            </p>
          </div>
          
          <Tabs defaultValue="identifications">
            <TabsList className="mb-6">
              <TabsTrigger value="identifications">My Identifications</TabsTrigger>
              <TabsTrigger value="feedback">My Feedback</TabsTrigger>
            </TabsList>
            
            <TabsContent value="identifications" className="space-y-6">
              {loading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-mushroom-primary" />
                </div>
              ) : userImages.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <FileImage className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">No images yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You haven't uploaded any mushroom images for identification.
                    </p>
                    <Button 
                      className="mt-4 bg-mushroom-primary hover:bg-mushroom-dark" 
                      asChild
                    >
                      <a href="/identify">Upload an Image</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div>
                  {selectedImage ? (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">Image Details</h3>
                        <Button variant="outline" size="sm" onClick={closeImageDetails}>
                          Back to Gallery
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="rounded-lg overflow-hidden border">
                            <img 
                              src={selectedImage.url}
                              alt="Mushroom" 
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            Uploaded on {new Date(selectedImage.uploadDate).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div>
                          {selectedImage.analyzed ? (
                            <div>
                              <h4 className="font-semibold text-lg mb-2">Classification Result</h4>
                              
                              <div className="p-4 rounded-md mb-4" style={{
                                backgroundColor: selectedImage.classification?.classification === 'edible' 
                                  ? 'rgba(34, 197, 94, 0.1)' 
                                  : 'rgba(239, 68, 68, 0.1)'
                              }}>
                                <Badge className={
                                  selectedImage.classification?.classification === 'edible' 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }>
                                  {selectedImage.classification?.classification}
                                </Badge>
                                
                                <p className="mt-2 text-sm">
                                  {selectedImage.classification?.details || 'No additional details available.'}
                                </p>
                                
                                <div className="mt-3 text-xs">
                                  Confidence: {Math.round(selectedImage.classification?.confidence * 100)}%
                                </div>
                              </div>
                              
                              <div className="text-sm">
                                <p className="font-semibold mb-1">Important Safety Notice</p>
                                <p className="text-muted-foreground">
                                  Always consult with an expert mycologist before consuming any wild mushrooms.
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                              <p className="mb-4 text-center">This image hasn't been analyzed yet.</p>
                              <Button className="bg-mushroom-primary hover:bg-mushroom-dark" asChild>
                                <Link to="/identify">Analyze Now</Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {userImages.map((image) => (
                        <div 
                          key={image._id} 
                          className="rounded-lg overflow-hidden border cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleImageClick(image._id)}
                        >
                          <div className="aspect-square relative">
                            <img 
                              src={image.url}
                              alt={`Mushroom ${image._id}`}
                              className="object-cover w-full h-full"
                            />
                            {image.analyzed && (
                              <div className="absolute top-2 right-2">
                                <Badge className={
                                  image.classification?.classification === 'edible'
                                    ? 'bg-green-100 text-green-800'
                                    : image.classification?.classification === 'poisonous'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-amber-100 text-amber-800'
                                }>
                                  {image.classification?.classification || 'Analyzed'}
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <p className="text-sm truncate">{image.fileName}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(image.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="feedback">
              {loading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-mushroom-primary" />
                </div>
              ) : userFeedback.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <MessageCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">No feedback submitted yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You haven't provided any feedback on mushroom identifications.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {userFeedback.map((feedback) => (
                    <Card key={feedback._id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base">
                            Feedback #{feedback._id.slice(-6)}
                          </CardTitle>
                          <Badge 
                            className={
                              feedback.status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                              feedback.status === 'rejected' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                              'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            }
                          >
                            {feedback.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {feedback.image && (
                          <div className="flex items-center mb-4">
                            <div className="w-16 h-16 rounded overflow-hidden mr-4">
                              <img 
                                src={feedback.image.url} 
                                alt="Mushroom" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium truncate max-w-[200px]">{feedback.image.fileName}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(feedback.image.uploadDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <p className="text-sm mb-4">{feedback.text}</p>
                        
                        <Separator className="my-4" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Submitted on {new Date(feedback.date).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex justify-center">
            <Button variant="outline" asChild>
              <Link to="/profile">Back to Profile</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default MyIdentificationsPage;
