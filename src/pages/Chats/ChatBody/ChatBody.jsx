import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { resetCurrentChat } from "../../../redux/chat.slice/chat.slice";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatFooter from "./ChatFooter";

const ChatBody = () => {
    const dispatch = useDispatch();

    const chatFormRef = useRef(null);
    const { messages } = useSelector((state) => state.chat.currentChat);

    const sortedMessages = messages.toSorted((a, b) => {
        return new Date(a.createdDate) - new Date(b.createdDate);
    });

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
            <Box ref={chatFormRef} sx={{ pl: 2, pr: 2 }} className="chat-body">
                <ChatHeader />
                <ChatContent sortedMessages={sortedMessages} />
                <ChatFooter />
            </Box>
        );
    }
};

export default ChatBody;
