import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./login.slice/login.slice";
import postReducer from "./post.slice/post.slice";
import chatReducer from "./chat.slice/chat.slice";


export const store = configureStore({
    reducer: {
        login: loginReducer,
        post: postReducer,
        chat: chatReducer
    }
})