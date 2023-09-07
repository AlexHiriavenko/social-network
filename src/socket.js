import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let token = JSON.parse(localStorage.getItem('token'))
const socket = new SockJS(`${import.meta.env.VITE_APP_API_URL}/websocket-endpoint?token=${token}`);
const stompClient = Stomp.over(socket);

export let isConnected = false;

const onConnect = () => {
    console.log('WebSocket connection opened');
    isConnected = true;
}

const onError = () => {
    isConnected = false;
}

export const connectWebSocket = () => {
    stompClient.connect({}, onConnect, onError)
  };
  
export const disconnectWebSocket = () => {
    stompClient.disconnect();
    console.log('WebSocket connection closed');
    isConnected = false;
};
  
export const subscribeToTopic = (topic, callback) => {
    stompClient.subscribe(topic, callback);
};

export const unSubscribeToTopic = (topic) => {
    stompClient.unsubscribe(topic);
};