import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
    Avatar,
} from "@mui/material";

const ChatForm = () => {
    const currentChat = useSelector((state) => state.chat.currentChat);
    const currentChatCompanion = useSelector(
        (state) => state.chat.currentChatCompanion
    );
    const { fullName, profilePicture } = currentChatCompanion;
    const messages = currentChat.messages;

    if (messages[0].createdBy) {
        return (
            <Box sx={{ p: 2, mb: 2 }}>
                <Link style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar
                        className="search__user-avatar"
                        sx={{ minWidth: "40px", minHeight: "40px" }}
                        alt="user icon"
                        src={profilePicture}
                    />
                    <Typography>{fullName}</Typography>
                </Link>
                <List>
                    {messages.map((message, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`Дата сообщения: ${new Date(
                                    message.createdDate || "date"
                                ).toLocaleString()}`}
                                secondary={`Автор: ${
                                    message.createdBy || "author"
                                }`}
                            />
                            <ListItemText
                                primary={`Текст сообщения: ${
                                    message.content || "text"
                                }`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    }
};

export default ChatForm;
