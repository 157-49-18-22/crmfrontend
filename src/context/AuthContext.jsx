import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initializationAttempted, setInitializationAttempted] = useState(false);
  const [loginCompleted, setLoginCompleted] = useState(false);

  // Guard function to prevent unauthorized user state changes
  const setUserSafely = (newUser) => {
    if (newUser === null) {
      // Only allow null if we're explicitly logging out or clearing invalid data
      if (loginCompleted && !loading) {
        return; // Don't allow reset after successful login
      }
      setUser(null);
    } else if (newUser && typeof newUser === 'object' && newUser.email) {
      // Validate user object before setting
      setUser(newUser);
    }
  };

  // Initialize authentication state - only run once
  useEffect(() => {
    if (initializationAttempted) return;
    
    const initializeAuth = async () => {
      setInitializationAttempted(true);
      
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            
            // Set user immediately from localStorage using safe setter
            setUserSafely(parsedUser);
            
            // Then validate token in background - but don't clear if it fails
            try {
              await authAPI.getCurrentUser();
            } catch (error) {
              // Don't clear auth data immediately on token validation failure
              // This might be a temporary server issue
              console.warn('Token validation failed, but keeping user logged in:', error.message);
            }
          } catch (parseError) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUserSafely(null);
          }
        } else {
          setUserSafely(null);
        }
      } catch (error) {
        setUserSafely(null);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [initializationAttempted]);

  // Set up automatic token refresh
  useEffect(() => {
    if (!user || !isInitialized) return;
    
    const refreshTokenInterval = setInterval(async () => {
      try {
        const response = await authAPI.refreshToken();
        const { token, user: refreshedUser } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(refreshedUser));
        setUserSafely(refreshedUser);
      } catch (error) {
        // Don't logout immediately, let the next API call handle it
      }
    }, 24 * 60 * 60 * 1000); // Refresh every 24 hours

    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, [user, isInitialized]);

  // If user was set but then reset to null unexpectedly, try to restore
  useEffect(() => {
    if (user === null && isInitialized && !loading && loginCompleted) {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser); // Direct set, bypassing safe setter
        } catch (error) {
          // Failed to restore user
        }
      }
    }
  }, [user, loading, isInitialized, loginCompleted]);

  const login = async (credentials) => {
    // Prevent multiple login attempts
    if (loading) {
      return { success: false, message: 'Login already in progress' };
    }
    
    try {
      setLoading(true);
      
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error('Invalid response from server - missing token or user data');
      }
      
      // Store token and user data FIRST
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update state AFTER storing in localStorage
      setUserSafely(user);
      setLoginCompleted(true); // Mark login as completed
      
      // Small delay to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUserSafely(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserSafely(null);
  };

  // Check if user is actually authenticated
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        JSON.parse(storedUser);
        return true;
      } catch (error) {
        return false;
      }
    }
    
    return false;
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      setUserSafely(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Update failed' 
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    checkAuthStatus,
    isAuthenticated: !!user,
    isInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 