import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { resetCurrentChat } from "../../../../redux/chat.slice/chat.slice";
import ChatHeader from "../../../../pages/Chats/ChatBody/ChatHeader";
import ChatContent from "../../../../pages/Chats/ChatBody/ChatContent";
import ChatFooter from "../../../../pages/Chats/ChatBody/ChatFooter";

const Chat = () => {
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.chat.currentChat);
    const chatFormRef = useRef(null);

    // в конец чата
    useEffect(() => {
        if (chatFormRef.current) {
            chatFormRef.current.scrollTop = chatFormRef.current.scrollHeight;
        }
    }, [messages]);

    // обнуление стейта текущего чата при размонтировании
    useEffect(() => {
        return () => {
            dispatch(resetCurrentChat());
        };
    }, []);

    if (messages[0].createdBy) {
        return (
            <Box
                id="chatModal"
                ref={chatFormRef}
                sx={{ pl: 2, pr: 2, pb: 2, maxHeight: "460px", overflow: "auto" }}
            >
                <ChatHeader />
                <ChatContent />
                <ChatFooter />
            </Box>
        );
    }
};

export default Chat;
