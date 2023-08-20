import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { resetCurrentChat } from "../../../redux/chat.slice/chat.slice";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatFooter from "./ChatFooter";
import { useTheme } from "@mui/material/styles";

const ChatBody = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
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
            <Box ref={chatFormRef} sx={{ pb: 2, pr: 2, pl: 1 }} className="chat-body">
                <ChatHeader />
                <ChatContent />
                <ChatFooter />
            </Box>
        );
    } else {
        return (
            <div
                className="empty-chat-page"
                style={{ color: theme.palette.textColor.secondary, marginTop: "22px" }}
            >
                Select a chat or start a new conversation
            </div>
        );
    }
};

export default ChatBody;
