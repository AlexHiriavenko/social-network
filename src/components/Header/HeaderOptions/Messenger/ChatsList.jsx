import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getChat,
    setCurrentChatCompanion,
    openChat,
    getChatsParticipants,
} from "../../../../redux/chat.slice/chat.slice";

import { List, ListItem, Typography, Avatar, Box } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function ChatsList(props) {
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        dispatch(getChatsParticipants());
    }, [dispatch]);

    const chatParticipants = useSelector((state) => state.chat.chatsParticipants);

    const chatParticipant = (participants, id) =>
        participants.find((participant) => participant.userId === id);

    function handlerChat(event, chatId) {
        const closestLi = event.target.closest("li");
        const userId = +closestLi.id.slice(8);
        dispatch(setCurrentChatCompanion(chatParticipant(chatParticipants, userId)));
        dispatch(getChat(chatId));
        dispatch(openChat());
    }

    return (
        <List className="users-list">
            {!chatParticipants.length && (
                <Typography sx={{ p: 2 }} color={theme.palette.textColor.content}>
                    No history yet
                </Typography>
            )}
            {!!chatParticipants.length &&
                chatParticipants.map(
                    ({ id: chatId, profilePicture, fullName, userId, content }) => (
                        <ListItem
                            id={`chatUser${userId}`}
                            key={userId}
                            onClick={(event) => handlerChat(event, chatId)}
                            sx={{
                                gap: 1,
                                "&:hover": {
                                    backgroundColor: theme.palette.hoverColor.secondary,
                                },
                            }}
                        >
                            <Link
                                style={{
                                    display: "flex",
                                    gap: "16px",
                                    width: "100%",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    className="search__user-avatar"
                                    sx={{ minWidth: "40px", minHeight: "40px" }}
                                    alt="user icon"
                                    src={profilePicture}
                                ></Avatar>
                                <Box>
                                    <Typography
                                        className="search__user-name"
                                        color={theme.palette.textColor.content}
                                    >
                                        {fullName}
                                    </Typography>
                                    <Typography
                                        className="search__user-name"
                                        color={theme.palette.textColor.content}
                                        sx={{
                                            maxWidth: "120px",
                                            fontSize: "12px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {content}
                                    </Typography>
                                </Box>
                            </Link>
                        </ListItem>
                    )
                )}
        </List>
    );
}

export default ChatsList;