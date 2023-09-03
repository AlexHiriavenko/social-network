import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChatsParticipants } from "../../../../../redux/chat.slice/chat.slice";
import { List, Typography } from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import ItemChatList from "./ItemChatList";

function ChatsList() {
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        dispatch(getChatsParticipants());
    }, [dispatch]);

    const chatParticipants = useSelector((state) => state.chat.chatsParticipants);

    return (
        <List className="users-list">
            {!chatParticipants?.length && (
                <Typography p={2} color={theme.palette.textColor.content}>
                    No history yet
                </Typography>
            )}
            {!!chatParticipants.length &&
                chatParticipants.map((chat) => <ItemChatList key={chat.id} chat={chat} />)}
        </List>
    );
}

export default ChatsList;
