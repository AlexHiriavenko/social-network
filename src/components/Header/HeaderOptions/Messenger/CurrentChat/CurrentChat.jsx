import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { resetCurrentChat } from "../../../../../redux/chat.slice/chat.slice";
import ListMessages from "../../../../../pages/Chats/ChatBody/ListMessages";
import ChatFooter from "../../../../../pages/Chats/ChatBody/ChatFooter";

const CurrentChat = () => {
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.chat.currentChat);
    const chatFormRef = useRef(null);

    useEffect(() => {
        return () => {
            dispatch(resetCurrentChat());
        };
    }, []);

    const showChat = messages && messages[0]?.createdBy;

    if (showChat) {
        return (
            <Box
                id="chatModal"
                ref={chatFormRef}
                sx={{ px: 2, pb: 2, height: "100%", overflow: "hidden" }}>
                <ListMessages />
                <ChatFooter />
            </Box>
        );
    }
};

export default CurrentChat;
