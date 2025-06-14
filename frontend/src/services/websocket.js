/ariokayuichi/bodycare+/frontend/src/services/websocket.js
const WS_URL = 'ws://localhost:3000/ws';

const socket = new WebSocket(WS_URL);

socket.onopen = () => {
  console.log('WebSocket接続が確立されました');
};

socket.onmessage = (event) => {
  console.log('メッセージを受信しました:', event.data);
};

socket.onerror = (error) => {
  console.error('WebSocketエラー:', error);
};

export default socket;
