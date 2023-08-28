import React, { Component, PureComponent } from 'react';
import SockJsClient from 'react-stomp';
import {StompJs} from '@stomp/stompjs';

class StompEx extends PureComponent{

    init() {
        console.log('init')
        const stompClient = new StompJs.Client({
            brokerURL: 'ws://social-network-backend-2782464b9c31.herokuapp.com/websocket-endpoint'
        });

        stompClient.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/message', (greeting) => {
                console.log(greeting);
            });
        };

        stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };
        
        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
    }

    connect(stompClient) {
        stompClient.activate();
    }

    disconnect(stompClient) {
        stompClient.deactivate();
        console.log("Disconnected");
    }

render() {
    return (<></>
     /*  <div>
        <SockJsClient url='http://localhost:8080/ws' topics={['/topics/all']}
            onMessage={(msg) => { console.log(msg); }}
            ref={ (client) => { this.clientRef = client }} />
      </div> */
    );
  }
}

export default StompEx;