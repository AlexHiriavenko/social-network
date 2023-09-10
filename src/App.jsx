import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import Header from "./components/Header/Header";
import Modals from "./components/Modals/Modals";
import { 
    connectWebSocket,
    disconnectWebSocket,
    isConnected,
} from './socket';
import AllRoutes from "./components/Routes";

import {addNewMessages, addNotifications} from './redux/notifications.slice/notifications.slice';


function App() {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn, shallowEqual);
    const authUser = useSelector((store)=>store.user.authorizedUser, shallowEqual);

    const notifications = useSelector((store)=>store.notifications.notifications, shallowEqual);
    const messages = useSelector((store)=>store.notifications.newMessages, shallowEqual);
    console.log(notifications);
    console.log(messages);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn && authUser) {
            connectWebSocket([{
                topic: `/topic/messages/user.${authUser.id}`, callback: (message) => {
                    console.log(message);
                    dispatch(addNewMessages(JSON.parse(message.body)));
                }
            }, {
                topic: `/topic/notification/user.${authUser.id}`, callback: (message) => {
                    console.log(message);
                    dispatch(addNotifications(JSON.parse(message.body)))
                }
            }])
        }
        if(isConnected && (!isLoggedIn || !authUser)) {
            disconnectWebSocket();
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
