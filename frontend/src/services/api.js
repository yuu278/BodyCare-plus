import axios from 'axios';

// APIのベースURL（環境変数対応）
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

// axiosインスタンスの作成
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true,
  timeout: 10000  // タイムアウトを10秒に設定
});

// リクエストインターセプター
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // デバッグ情報の改善
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

// レスポンスインターセプターの改善
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
    // エラーハンドリングの改善
    const errorDetails = {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      data: error.response?.data,
      config: error.config
    };

    console.error('APIエラー詳細:', errorDetails);

    // エラータイプに応じた処理
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
