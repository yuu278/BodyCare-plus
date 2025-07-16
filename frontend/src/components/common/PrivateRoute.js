import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth();

  // currentUser が null の場合でも、初期チェックが終わっていないだけかもしれない
  if (currentUser === null) {
    // 認証確認中のため、ローディングを返す（もしくは null）
    return <div>認証確認中...</div>;
  }

  // 認証済みなら表示、それ以外はログインへ
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
