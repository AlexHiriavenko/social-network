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
import { deleteTemporaryParticipant } from "../../../redux/chat.slice/chat.slice";
import { isAuthUser, setChatParticipant } from "../helpers/chatsHelpers";

function UsersList(props) {
    const { setNewMessageDialog } = props;
    const dispatch = useDispatch();
    const theme = useTheme();

    const authUserID = useSelector((state) => state.user.authorizedUser.id);
    const chatParticipants = useSelector((state) => state.chat.chatsParticipants);

    const currentChat = useSelector((state) => state.chat.currentChat);

    function handlerChat(event, chatId, participants, userId) {
        dispatch(setCurrentChatCompanion(setChatParticipant(participants, userId)));
        dispatch(getChat(chatId));
        dispatch(openPageChat());
        dispatch(deleteTemporaryParticipant());
        setNewMessageDialog(false);
    }

    function isActiveItem(id) {
        return currentChat.id === id;
    }

    return (
        <List
            className="users-list"
            sx={{ minHeight: "50px", maxHeight: "80vh", overflowY: "auto" }}
        >
            {!chatParticipants.length && (
                <Typography sx={{ p: 2 }} color={theme.palette.textColor.content}>
                    No history yet
                </Typography>
            )}
            {!!chatParticipants.length &&
                chatParticipants.map(
                    ({
                        id: chatId,
                        profilePicture,
                        fullName,
                        userId,
                        content,
                        chatParticipant,
                    }) => (
                        <ListItem
                            id={`chat${chatId}`}
                            key={chatId}
                            onClick={(event) => handlerChat(event, chatId, chatParticipant, userId)}
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
                                    src={
                                        isAuthUser(authUserID, userId)
                                            ? chatParticipant[0].profilePicture
                                            : profilePicture
                                    }
                                ></Avatar>
                                <Box className="searh__user-text">
                                    <Typography
                                        className="search__user-name"
                                        color={theme.palette.textColor.content}
                                    >
                                        {isAuthUser(authUserID, userId)
                                            ? chatParticipant[0].fullName
                                            : fullName}{" "}
                                        {chatParticipant.length > 1 && (
                                            <Typography variant="span" sx={{ fontSize: "13px" }}>
                                                & {chatParticipant.length - 1} more
                                            </Typography>
                                        )}
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
                                        {isAuthUser(authUserID, userId)
                                            ? "You: " + content
                                            : content}
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
