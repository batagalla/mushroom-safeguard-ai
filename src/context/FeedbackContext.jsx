
import React, { createContext, useState, useContext } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const submitFeedback = async (imageId, text) => {
    if (!currentUser) {
      toast.error("You need to be logged in to submit feedback");
      return { success: false, error: "Authentication required" };
    }

    setLoading(true);
    try {
      // In a real application, this would make an API call to your backend
      const newFeedback = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        imageId,
        text,
        date: new Date().toISOString(),
        status: 'pending'
      };
      
      setFeedback(prevFeedback => [...prevFeedback, newFeedback]);
      toast.success("Feedback submitted successfully");
      return { success: true, feedback: newFeedback };
    } catch (error) {
      toast.error("Failed to submit feedback");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getUserFeedback = (userId) => {
    return feedback.filter(fb => fb.userId === userId);
  };

  const getAllFeedback = () => {
    return feedback;
  };

  const updateFeedbackStatus = (feedbackId, status) => {
    setFeedback(prevFeedback => 
      prevFeedback.map(fb => 
        fb.id === feedbackId ? { ...fb, status } : fb
      )
    );
    toast.success(`Feedback status updated to ${status}`);
    return { success: true };
  };

  const value = {
    feedback,
    loading,
    submitFeedback,
    getUserFeedback,
    getAllFeedback,
    updateFeedbackStatus
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
