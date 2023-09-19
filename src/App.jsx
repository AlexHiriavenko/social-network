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

import { setAllNotifications, addNewMessages, addNewNotifications, getNotifications } from './redux/notifications.slice/notifications.slice';
import { addMessageToChat } from './redux/chat.slice/chat.slice';


function App() {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn, shallowEqual);
    const authUser = useSelector((store) => store.user.authorizedUser, shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn && authUser) {
            connectWebSocket([{
                topic: `/topic/messages/user.${authUser.id}`, callback: (message) => {
                    dispatch(addMessageToChat(JSON.parse(message.body)));
                }
            }, {
                topic: `/topic/notification/user.${authUser.id}`, callback: (message) => {
                    dispatch(addNewNotifications(JSON.parse(message.body)));
                }
            }])
        }
        if (isConnected && (!isLoggedIn || !authUser)) {
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
