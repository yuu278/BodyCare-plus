import apiClient from './api';

// ログイン
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

// ログアウト
export const logout = () => {
  localStorage.removeItem('token');
};

// ユーザー登録
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/users', { user: userData });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 現在のユーザー情報を取得
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// トークンが有効かどうかをチェック
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};