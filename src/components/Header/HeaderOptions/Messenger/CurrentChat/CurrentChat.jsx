import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { resetCurrentChat } from "../../../../../redux/chat.slice/chat.slice";
import ListMessages from "../../../../../pages/Chats/ChatBody/ListMessages";
import ChatFooter from "../../../../../pages/Chats/ChatBody/ChatFooter";
import { ChatContainer } from "../../../../../pages/Chats/styledChatComponents";

const CurrentChat = () => {
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.chat.currentChat);
    const chatFormRef = useRef(null);

    useEffect(() => {
        return () => {
            dispatch(resetCurrentChat());
        };
    }, []);

    if (messages && messages[0].createdBy) {
        return (
            <ChatContainer
                id="chatModal"
                ref={chatFormRef}
                sx={{ pb: 2, minHeight: "400px", overflow: "hidden" }}>
                <ListMessages />
                <ChatFooter />
            </ChatContainer>
        );
    }
};

export default CurrentChat;
