import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient;
let socket;
let listOfChanales;
export const subscribes = [];
const serverUrl = `${import.meta.env.VITE_APP_API_URL}/websocket-endpoint`;
export let isConnected = false;

export const connectWebSocket = (inputListOfChanales) => {
    listOfChanales = inputListOfChanales;
    connectSocket();
  };

const connectSocket = () => {
    if (!socket) {
        socket = new SockJS(serverUrl);
        stompClient = Stomp.over(socket);    
    }
    
    stompClient.connect({}, (frame) => {
        console.log('Connected to WebSocket');
        isConnected = true;
        
        listOfChanales.forEach(element => {
            if(subscribes.filter(el => el.topic === element.topic).length > 0) {
                return;
            }
            const id = stompClient.subscribe(element.topic, (message) => element.callback(message))
            subscribes.push({topic: element.topic, id});
        });
      });
      
    socket.onClose = (event) => {
        console.log(event);
        isConnected = false;
        connectSocket();
    } 
}

export const disconnectWebSocket = () => {
    stompClient.disconnect();
    console.log('WebSocket connection closed');
    subscribes.forEach(el => stompClient.unsubscribe(el.id.id));
    subscribes.splice(0);
    isConnected = false;
};