
import React, { createContext, useState, useContext } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [classification, setClassification] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const uploadImage = async (file) => {
    if (!currentUser) {
      toast.error("You need to be logged in to upload images");
      return { success: false, error: "Authentication required" };
    }

    setLoading(true);
    try {
      // In a real application, this would upload to cloudinary via your backend
      // For demo purposes, we're using local URLs
      const imageUrl = URL.createObjectURL(file);
      
      const newImage = {
        id: Date.now().toString(),
        userId: currentUser.id,
        url: imageUrl,
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        analyzed: false
      };
      
      setImages((prevImages) => [...prevImages, newImage]);
      setSelectedImage(newImage);
      toast.success("Image uploaded successfully");
      return { success: true, image: newImage };
    } catch (error) {
      toast.error("Failed to upload image");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const analyzeImage = async (imageId) => {
    setLoading(true);
    try {
      // Find the image
      const image = images.find(img => img.id === imageId);
      if (!image) {
        throw new Error("Image not found");
      }
      
      // In a real application, this would make an API call to your AI model
      // For demo purposes, we're randomly determining if it's edible or poisonous
      const isEdible = Math.random() > 0.5;
      
      const result = {
        id: Date.now().toString(),
        imageId,
        classification: isEdible ? "edible" : "poisonous",
        confidence: Math.round(Math.random() * 50 + 50) / 100, // Random confidence between 0.5 and 1
        details: isEdible 
          ? "This mushroom appears to be safe for consumption. However, always verify with multiple sources before consuming any wild mushroom." 
          : "This mushroom appears to be poisonous. Do not consume and wash your hands if you've handled it.",
        date: new Date().toISOString()
      };
      
      // Update the image to mark it as analyzed
      setImages(prevImages => 
        prevImages.map(img => 
          img.id === imageId ? { ...img, analyzed: true } : img
        )
      );
      
      setClassification(result);
      toast.success("Analysis complete");
      return { success: true, result };
    } catch (error) {
      toast.error("Failed to analyze image");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getUserImages = (userId) => {
    return images.filter(img => img.userId === userId);
  };

  const value = {
    images,
    selectedImage,
    setSelectedImage,
    classification,
    setClassification,
    loading,
    uploadImage,
    analyzeImage,
    getUserImages
  };

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};
