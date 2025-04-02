
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setIsAdmin(userData.role === 'admin');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // In a real application, this would make an API call to your backend
    setLoading(true);
    try {
      // Mock authentication for demonstration
      // In a real app, this would be an API request
      if (email === "admin@mushroom.com" && password === "admin123") {
        const user = { id: "admin1", name: "Admin User", email, role: "admin" };
        setCurrentUser(user);
        setIsAdmin(true);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success("Admin login successful");
        return { success: true, user };
      }
      
      // Mock regular user login
      if (email === "user@example.com" && password === "password123") {
        const user = { id: "user1", name: "Demo User", email, role: "user" };
        setCurrentUser(user);
        setIsAdmin(false);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success("Login successful");
        return { success: true, user };
      }

      throw new Error("Invalid credentials");
    } catch (error) {
      toast.error(error.message || "Login failed");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      // Mock registration for demonstration
      // In a real app, this would be an API request
      const user = { id: Date.now().toString(), name, email, role: "user" };
      setCurrentUser(user);
      setIsAdmin(false);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success("Registration successful");
      return { success: true, user };
    } catch (error) {
      toast.error(error.message || "Registration failed");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAdmin(false);
    toast.success("Logged out successfully");
  };

  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
