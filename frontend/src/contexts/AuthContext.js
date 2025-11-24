import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, register, logout, getCurrentUser } from '../services/auth';
import apiClient from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const initAuth = async () => {
      try {
        const user = await getCurrentUser();
        console.log('現在のユーザー:', user);
        setCurrentUser(user);
      } catch (error) {
        console.error('現在のユーザー取得に失敗しました:', error);
        await logoutUser();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password);
      console.log("🔍 ログインレスポンス:", response);
      if (response.token) {
        localStorage.setItem('token', response.token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      }
      setCurrentUser(response.user);
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

  const clearUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
  };

  const value = {
    currentUser,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    clearUser,
    isAuthenticated: !!currentUser,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
