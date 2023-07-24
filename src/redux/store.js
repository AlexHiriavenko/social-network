import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login.slice/login.slice";
import searchDrawerReducer from "./searchDrawer.slice/headerSearch.slice";
import postReducer from "./post.slice/post.slice";
import chatReducer from "./chat.slice/chat.slice";
import userReducer from "./user.slice/user.slice.js";
import darkModeSReducer from "./darkMode.slice/darkMode.slice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        searchDrawer: searchDrawerReducer,
        post: postReducer,
        chat: chatReducer,
        darkMode: darkModeSReducer,
        user:userReducer
    },
});
