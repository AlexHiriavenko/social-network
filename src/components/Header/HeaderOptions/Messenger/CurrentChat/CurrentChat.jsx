import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { resetCurrentChat } from "../../../../../redux/chat.slice/chat.slice";
import ChatContent from "../../../../../pages/Chats/ChatBody/ChatContent";
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

    if (messages && messages[0].createdBy) {
        return (
            <Box
                id="chatModal"
                ref={chatFormRef}
                sx={{ px: 2, pb: 2, height: "100%", overflow: "hidden" }}
            >
                <ChatContent />
                <ChatFooter />
            </Box>
        );
    }
};

export default CurrentChat;
