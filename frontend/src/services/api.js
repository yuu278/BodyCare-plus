import axios from 'axios';

// ✅ 環境変数名を REACT_APP_API_BASE_URL に統一
const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1';

// デバッグ用
console.log('🔧 API_URL:', API_URL);
console.log('🔧 Environment:', process.env.NODE_ENV);

const token = localStorage.getItem('token');

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  },
  withCredentials: true,
  timeout: 10000
});

// リクエストインターセプター
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('APIリクエスト詳細:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('リクエストエラー詳細:', {
      message: error.message,
      config: error.config
    });
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response) => {
    console.log('APIレスポンス成功:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    const errorDetails = {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      data: error.response?.data,
      config: error.config
    };

    console.error('APIエラー詳細:', errorDetails);

    switch (error.code) {
      case 'ERR_NETWORK':
        console.error('ネットワークエラー: サーバーに接続できません');
        break;
      case 'ERR_TIMEOUT':
        console.error('タイムアウトエラー: リクエストがタイムアウトしました');
        break;
      default:
        if (error.response?.status === 401) {
          console.error('認証エラー: 認証情報が無効です');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
