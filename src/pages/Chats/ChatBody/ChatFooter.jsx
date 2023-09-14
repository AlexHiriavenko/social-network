import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { StyledTextField } from "../styledChatComponents";
import { StyledAvatar, ChatFooterContainer } from "./StyledChatBody";
import SendIcon from "@mui/icons-material/Send";
import { sendMessage } from "../../../redux/message.slice/message.slice";
import { getChat } from "../../../redux/chat.slice/chat.slice";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import IconButton from "@mui/material/IconButton";

function ChatFooter() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const currentChat = useSelector((state) => state.chat.currentChat);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && inputRef.current.value.trim()) {
            event.preventDefault();
            const inputValue = inputRef.current.value.trim();
            const newMessage = {
                id: 0,
                content: inputValue,
                chatId: currentChat.id,
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
                id: 0,
                content: inputValue,
                chatId: currentChat.id,
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
        <ChatFooterContainer>
            <StyledTextField
                label="your message"
                variant="outlined"
                multiline
                inputRef={inputRef}
                onKeyDown={handleKeyDown}
                InputProps={{
                    endAdornment: (
                        <IconButton sx={{ p: 0 }}>
                            <AddPhotoAlternateIcon
                                sx={{
                                    color: "#45bd62",
                                    width: "24px",
                                    height: "24px",
                                }}
                            />
                        </IconButton>
                    ),
                }}></StyledTextField>
            <StyledAvatar
                sx={{
                    bgcolor: theme.palette.hoverColor.secondary,
                    p: 1,
                    boxSizing: "content-box",
                    mb: 1,
                }}
                onClick={handleClickSend}>
                <SendIcon fontSize="large" color="primary" />
            </StyledAvatar>
        </ChatFooterContainer>
    );
}

export default ChatFooter;
