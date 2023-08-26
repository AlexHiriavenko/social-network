import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getChat,
    setCurrentChatCompanion,
    openPageChat,
} from "../../../redux/chat.slice/chat.slice";

import { List, ListItem, Typography, Avatar, Box } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
    getChatsParticipants,
    deleteTemporaryParticipant,
} from "../../../redux/chat.slice/chat.slice";

function UsersList(props) {
    const { setNewMessageDialog } = props;
    const dispatch = useDispatch();
    const theme = useTheme();

    // useEffect(() => {
    //     dispatch(getChatsParticipants());
    // }, [dispatch]);

    // dispatch(getChatsParticipants());

    const chatParticipants = useSelector((state) => state.chat.chatsParticipants);
    const currentChat = useSelector((state) => state.chat.currentChat);

    const chatParticipant = (participants, id) =>
        participants.find((participant) => participant.userId === id);

    function handlerChat(event, chatId) {
        if (chatId) {
            const closestLi = event.target.closest("li");
            const userId = +closestLi.id.slice(8);
            dispatch(setCurrentChatCompanion(chatParticipant(chatParticipants, userId)));
            dispatch(getChat(chatId));
            dispatch(openPageChat());
            dispatch(deleteTemporaryParticipant());
            setNewMessageDialog(false);
        }
    }

    function isActiveItem(id) {
        return currentChat.id === id;
    }

    return (
        <List className="users-list" sx={{ minHeight: "50px" }}>
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
                                backgroundColor: isActiveItem(chatId)
                                    ? theme.palette.hoverColor.secondary
                                    : "none",
                                gap: 1,
                                "&:hover": {
                                    backgroundColor: theme.palette.hoverColor.secondary,
                                },
                            }}
                            className="chats__list-item"
                        >
                            <Link className="search__user-link">
                                <Avatar
                                    className="search__user-avatar"
                                    sx={{ minWidth: "40px", minHeight: "40px" }}
                                    alt="user icon"
                                    src={profilePicture}
                                ></Avatar>
                                <Box className="searh__user-text">
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

export default UsersList;
