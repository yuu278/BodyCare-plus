import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, register, logout, getCurrentUser } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('現在のユーザー取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password);
      setCurrentUser(response.user);  // ここを response.user に修正
      return response.user;
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await register(userData);
      setCurrentUser(response.user);
      return response.user;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setCurrentUser(null);
    } catch (error) {
      throw error;
    }
  };

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  const value = {
    currentUser,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    isAuthenticated: !!currentUser,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
