import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import Header from "./components/Header/Header";
import Modals from "./components/Modals/Modals";
import { 
    connectWebSocket, 
    disconnectWebSocket, 
    subscribeToTopic, 
    unSubscribeAllTopics, 
    isConnected, 
    subscribes 
} from './socket';
import AllRoutes from "./components/Routes";

import {addNewMessages} from './redux/notifications.slice/notifications.slice';


function App() {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const authUser = useSelector((store)=>store.user.authorizedUser, shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isConnected) {
            connectWebSocket();

        return () => {
            if(isConnected) {
              disconnectWebSocket();
            }
          };
        }
    }, []);

    useEffect(() => {
        if (isConnected && isLoggedIn && authUser) {
            subscribeToTopic(`/topic/messages/user.${authUser.id}`, (message) => {
                console.log(message);
                dispatch(addNewMessages(message.body));
            })
            subscribeToTopic(`/topic/notification/user.${authUser.id}`, (message) => {
                console.log(message);
            })} else if((!isLoggedIn || !authUser) && subscribes.length > 0) {
                unSubscribeAllTopics();
            }
    }, [dispatch, isLoggedIn, authUser]);

    return (
        <>
            {isLoggedIn && <Header />}
            <AllRoutes />
            <Modals />
        </>
    );
}

export default App;
