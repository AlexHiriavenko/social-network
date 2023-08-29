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
import filterChatParticipants from "../helpers/filterChatParticipants";

function UsersList(props) {
    const { setNewMessageDialog } = props;
    const dispatch = useDispatch();
    const theme = useTheme();

    const authUserID = useSelector((state) => state.user.authorizedUser.id);
    const chatParticipants = useSelector(
        (state) => state.chat.chatsParticipants
    );

    const filteredChats = filterChatParticipants(chatParticipants, authUserID);

    // function filteredParticpents() {
    //     if (chatParticipants.length > 0) {
    //         const filteredParticpents = chatParticipants.filter(
    //             (chat) => chat.userId !== authUserID
    //         );

    //         const uniqueIdMap = new Map();
    //         const idCountMap = {};

    //         filteredParticpents.forEach((item) => {
    //             if (!uniqueIdMap.has(item.id)) {
    //                 uniqueIdMap.set(item.id, item);
    //                 idCountMap[item.id] = 0;
    //             } else {
    //                 idCountMap[item.id] += 1;
    //             }
    //         });

    //         const clone = structuredClone(uniqueIdMap);

    //         clone.forEach((item) => {
    //             item.quantityUsers = idCountMap[item.id];
    //         });

    //         return Array.from(clone.values());
    //     }
    //     return [];
    // }

    const currentChat = useSelector((state) => state.chat.currentChat);

    const chatParticipant = (participants, id) =>
        participants.find((participant) => participant.userId === id);

    function handlerChat(event, chatId) {
        if (chatId) {
            const closestLi = event.target.closest("li");
            const userId = +closestLi.id.slice(8);
            dispatch(
                setCurrentChatCompanion(
                    chatParticipant(chatParticipants, userId)
                )
            );
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
        <List
            className="users-list"
            sx={{ minHeight: "50px", maxHeight: "80vh", overflowY: "auto" }}>
            {!chatParticipants.length && (
                <Typography
                    sx={{ p: 2 }}
                    color={theme.palette.textColor.content}>
                    No history yet
                </Typography>
            )}
            {!!filteredChats.length &&
                filteredChats.map(
                    ({
                        id: chatId,
                        profilePicture,
                        fullName,
                        userId,
                        content,
                        quantityUsers,
                    }) => (
                        <ListItem
                            id={`chatUser${userId}`}
                            key={chatId}
                            onClick={(event) => handlerChat(event, chatId)}
                            sx={{
                                backgroundColor: isActiveItem(chatId)
                                    ? theme.palette.hoverColor.secondary
                                    : "none",
                                gap: 1,
                                "&:hover": {
                                    backgroundColor:
                                        theme.palette.hoverColor.secondary,
                                },
                            }}
                            className="chats__list-item">
                            <Link className="search__user-link">
                                <Avatar
                                    className="search__user-avatar"
                                    sx={{ minWidth: "40px", minHeight: "40px" }}
                                    alt="user icon"
                                    src={profilePicture}></Avatar>
                                <Box className="searh__user-text">
                                    <Typography
                                        className="search__user-name"
                                        color={theme.palette.textColor.content}>
                                        {fullName}{" "}
                                        {quantityUsers > 0 && (
                                            <Typography
                                                variant="span"
                                                sx={{ fontSize: "13px" }}>
                                                & {quantityUsers} more
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
                                        }}>
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
