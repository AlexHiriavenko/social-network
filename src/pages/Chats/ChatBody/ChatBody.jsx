import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { resetCurrentChat } from "../../../redux/chat.slice/chat.slice";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatFooter from "./ChatFooter";
import NewMessageDialog from "../NewMessageDialog/NewMessageDialog";

const ChatBody = (props) => {
    const { newMessageDialog, setNewMessageDialog } = props;
    const dispatch = useDispatch();
    const theme = useTheme();
    const { messages } = useSelector((state) => state.chat.currentChat) || [];
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

    if (messages && messages[0].createdBy) {
        return (
            <Box ref={chatFormRef} sx={{ pb: 2 }} className="chat-body">
                <ChatHeader closeMenu={() => null} setNewMessageDialog={setNewMessageDialog} />
                <Box sx={{ maxWidth: "1000px" }}>
                    <Box sx={{ pl: 2, pr: 2 }}>
                        <ChatContent />
                        <ChatFooter />
                    </Box>
                </Box>
            </Box>
        );
    }
    if (newMessageDialog) {
        return <NewMessageDialog setNewMessageModal={setNewMessageDialog}></NewMessageDialog>;
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
