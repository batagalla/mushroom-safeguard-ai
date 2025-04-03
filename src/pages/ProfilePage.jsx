
import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { useImage } from '@/context/ImageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedbackList from '@/components/Feedback/FeedbackList';
import { User, FileImage, Loader2, Edit2, Eye, Save } from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const { fetchUserImages, getUserImages } = useImage();
  const [userImages, setUserImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });
  
  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser) {
        setLoading(true);
        await fetchUserImages();
        const images = await getUserImages(currentUser.id);
        setUserImages(images);
        setProfileData({
          name: currentUser.name,
          email: currentUser.email
        });
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [currentUser]);
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Discard changes
      setProfileData({
        name: currentUser.name,
        email: currentUser.email
      });
    }
    setIsEditing(!isEditing);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = async () => {
    // In a real application, you would call an API to update the user profile
    // For this demo, we'll just show a success message
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <section className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">My Profile</h1>
              <p className="text-muted-foreground">
                Manage your account information and view past identifications.
              </p>
            </div>
            <Button variant="outline" onClick={logout}>
              Log Out
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Account Information</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleEditToggle}
                >
                  {isEditing ? (
                    <>Cancel</>
                  ) : (
                    <>
                      <Edit2 className="mr-1 h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-muted rounded-full p-6 md:p-8">
                  <User className="h-12 w-12 text-mushroom-primary" />
                </div>
                
                {isEditing ? (
                  <div className="space-y-4 flex-1">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="max-w-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="max-w-md"
                      />
                    </div>
                    <div>
                      <Button 
                        className="bg-mushroom-primary hover:bg-mushroom-dark mt-4"
                        onClick={handleSaveProfile}
                      >
                        <Save className="mr-1 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>
                      <div className="font-medium">Name</div>
                      <div className="text-muted-foreground">{currentUser.name}</div>
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">{currentUser.email}</div>
                    </div>
                    <div>
                      <div className="font-medium">Account Type</div>
                      <div className="text-muted-foreground capitalize">{currentUser.role}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">My Activity</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                >
                  <Link to="/my-identifications">
                    <Eye className="mr-1 h-4 w-4" />
                    View All
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileImage className="h-5 w-5 text-mushroom-primary" />
                    <h3 className="font-medium">Identifications</h3>
                  </div>
                  <p className="text-2xl font-bold">{userImages.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total mushroom images uploaded
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileImage className="h-5 w-5 text-mushroom-primary" />
                    <h3 className="font-medium">Analyzed</h3>
                  </div>
                  <p className="text-2xl font-bold">
                    {userImages.filter(img => img.analyzed).length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Images that have been analyzed
                  </p>
                </div>
              </div>
              
              {userImages.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Recent Uploads</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {userImages.slice(0, 4).map((image) => (
                      <div key={image._id} className="aspect-square relative rounded overflow-hidden">
                        <img 
                          src={image.url}
                          alt={`Mushroom ${image._id}`}
                          className="object-cover w-full h-full"
                        />
                        {image.analyzed && (
                          <div className="absolute top-1 right-1">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-1.5 py-0.5 rounded-sm">
                              Analyzed
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline" 
                size="sm" 
                className="mt-2 w-full"
                asChild
              >
                <Link to="/my-identifications">View All Identifications & Feedback</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Tabs defaultValue="identifications">
            <TabsList className="mb-6">
              <TabsTrigger value="identifications">Latest Identifications</TabsTrigger>
              <TabsTrigger value="feedback">Latest Feedback</TabsTrigger>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userImages.slice(0, 3).map((image) => (
                    <Card key={image._id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img 
                          src={image.url}
                          alt={`Mushroom ${image._id}`}
                          className="object-cover w-full h-full"
                        />
                        {image.analyzed && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Analyzed
                            </span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-3">
                        <p className="text-sm truncate">{image.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(image.uploadDate).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              <div className="flex justify-center mt-4">
                <Button variant="outline" asChild>
                  <Link to="/my-identifications">View All Identifications</Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="feedback">
              <FeedbackList userId={currentUser.id} isAdmin={false} />
              <div className="flex justify-center mt-4">
                <Button variant="outline" asChild>
                  <Link to="/my-identifications">View All Feedback</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
