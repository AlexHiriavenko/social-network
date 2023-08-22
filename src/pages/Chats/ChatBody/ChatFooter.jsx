import { Box, Avatar } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { StyledTextField } from "../styledChatComponents";
import SendIcon from "@mui/icons-material/Send";
import { sendMessage } from "../../../redux/message.slice/message.slice";
import { getChat } from "../../../redux/chat.slice/chat.slice";

function ChatFooter() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const inputRef = useRef(null);
    const authUser = useSelector((state) => state.user.authorizedUser);
    const currentChat = useSelector((state) => state.chat.currentChat);

    const handleKeyDown = (event, id = 0) => {
        if (event.key === "Enter" && inputRef.current.value.trim()) {
            const inputValue = inputRef.current.value.trim();
            const newMessage = {
                id: id,
                content: inputValue,
                sender: authUser,
                chat: currentChat,
            };
            inputRef.current.value = "";
            dispatch(sendMessage(newMessage))
                .then(() => dispatch(getChat(currentChat.id)))
                .catch((error) => {
                    console.error("Error sending message:", error);
                });
        }
    };

    const handleClickSend = (event, id = 0) => {
        if (inputRef.current.value.trim()) {
            const inputValue = inputRef.current.value.trim();
            const newMessage = {
                id: id,
                content: inputValue,
                sender: authUser,
                chat: currentChat,
            };
            inputRef.current.value = "";
            dispatch(sendMessage(newMessage))
                .then(() => dispatch(getChat(currentChat.id)))
                .catch((error) => {
                    console.error("Error sending message:", error);
                });
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                mt: 2,
                mb: 1,
            }}
        >
            <StyledTextField
                label="your message"
                variant="outlined"
                multiline
                inputRef={inputRef}
                onKeyDown={handleKeyDown}
            />
            <Avatar
                sx={{
                    bgcolor: theme.palette.hoverColor.secondary,
                    minWidth: "40px",
                    minHeight: "40px",
                    cursor: "pointer",
                    p: 1,
                    boxSizing: "content-box",
                    transitionDuration: "0.5s",
                    "&:hover": {
                        backgroundColor: theme.palette.buttonColor.backgroundHover,
                    },
                }}
                onClick={handleClickSend}
            >
                <SendIcon fontSize="large" color="primary" />
            </Avatar>
        </Box>
    );
}

export default ChatFooter;
