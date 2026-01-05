import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated , loading } = useAuth();

  // AuthContext に "loading" が無い場合は追加推奨
  // loading = ユーザー情報を Firebase or API から読み込み中

  if (loading) {
    return <div>認証確認中...</div>;
  }

  // 未ログインならログインページへ
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ログイン済みなら子コンポーネントを表示
  return children;
};

export default PrivateRoute;
