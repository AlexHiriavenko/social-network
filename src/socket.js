import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let token = JSON.parse(localStorage.getItem('token'))
const socket = new SockJS(`${import.meta.env.VITE_APP_API_URL}/websocket-endpoint?token=${token}`);
const stompClient = Stomp.over(socket);

export let isConnected = false;
export const subscribes = [];

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
    if(subscribes.filter(el => el.topic === topic).length > 0) {
        return;
    }
    const id = stompClient.subscribe(topic, callback);
    subscribes.push({topic, id});
};

export const unSubscribeTopic = (topic) => {
    stompClient.unsubscribe(topic);
};

export const unSubscribeAllTopics = () => {
    subscribes.forEach(el => stompClient.unsubscribe(el.id.id));
    subscribes.splice(0);
};