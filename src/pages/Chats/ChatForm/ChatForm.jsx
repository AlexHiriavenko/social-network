import React from "react";
import { useSelector } from "react-redux";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const ChatForm = () => {
    const currentChat = useSelector((state) => state.chat.currentChat) || {};
    const messages = currentChat.messages;
    console.log(messages);
    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Сообщения:
            </Typography>
            <List>
                {messages.map((message, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`Дата сообщения: ${new Date(
                                message.createdDate || "date"
                            ).toLocaleString()}`}
                            secondary={`Автор: ${message.createdBy || "author"}`}
                        />
                        <ListItemText primary={`Текст сообщения: ${message.text || "text"}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ChatForm;
