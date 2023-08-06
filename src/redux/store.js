import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login.slice/login.slice";
import searchDrawerReducer from "./searchDrawer.slice/headerSearch.slice";
import postReducer from "./post.slice/post.slice";
import chatReducer, { chatPageReducer } from "./chat.slice/chat.slice";
import friendReducer from "./friends/friends.slise";
import userReducer from "./user.slice/user.slice.js";
import darkModeSReducer from "./darkMode.slice/darkMode.slice";
import modalReducer from "./modal.slice/modal.slice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        searchDrawer: searchDrawerReducer,
        post: postReducer,
        chat: chatReducer,
        chatPage: chatPageReducer,
        darkMode: darkModeSReducer,
        friends: friendReducer,
        modal: modalReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
