import apiClient from './api';

// ログイン
export const login = async (email, password) => {
  try {
    // 既存の認証情報をクリア
    logout();
    const response = await apiClient.post('/auth/login', {
      auth: { email, password }
    });
    if (!response.data || !response.data.token) {
      throw new Error('無効なレスポンス形式です');
    }
    // 認証情報の保存
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // 認証ヘッダーの設定
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('ログイン成功:', { user });
    return response.data;
  } catch (error) {
    console.error('ログインエラー詳細:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    if (error.response?.status === 401) {
      throw new Error('認証に失敗しました。メールアドレスとパスワードを確認してください。');
    }
    throw new Error(
      error.response?.data?.error ||
      error.message ||
      'ログイン処理中にエラーが発生しました'
    );
  }
};

// ゲストログイン
export const guestLogin = async () => {
  try {
    // 既存の認証情報をクリア
    logout();
    const response = await apiClient.post('/auth/guest_login');
    if (!response.data || !response.data.token) {
      throw new Error('無効なレスポンス形式です');
    }
    // 認証情報の保存
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isGuest', 'true');
    // 認証ヘッダーの設定
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('ゲストログイン成功:', { user });
    return response.data;
  } catch (error) {
    console.error('ゲストログインエラー:', error);
    throw new Error('ゲストログインに失敗しました');
  }
};

// ログアウト（ゲストフラグも削除）
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('isGuest');
  delete apiClient.defaults.headers.common['Authorization'];
};

// ゲストユーザーかどうかをチェック
export const isGuestUser = () => {
  return localStorage.getItem('isGuest') === 'true';
};

// ユーザー登録
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', { user: userData });
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
  const user = localStorage.getItem('user');
  return !!(token && user);
};

// 認証状態を確認するデバッグ関数
export const checkAuthState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const headers = apiClient.defaults.headers.common['Authorization'];
  console.log('認証状態:', {
    hasToken: !!token,
    hasUser: !!user,
    hasAuthHeader: !!headers,
    tokenValue: token,
    userValue: user ? JSON.parse(user) : null,
    headerValue: headers
  });
};
