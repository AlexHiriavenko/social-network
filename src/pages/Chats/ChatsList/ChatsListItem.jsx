import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getChat,
    setCurrentChatCompanion,
    openPageChat,
} from "../../../redux/chat.slice/chat.slice";
import { Typography, Avatar, Box, Tooltip, Badge } from "@mui/material/";
import { Link } from "react-router-dom";
import {
    deleteTemporaryParticipant,
    resetCurrentChat,
} from "../../../redux/chat.slice/chat.slice";
import { isAuthUser, setChatParticipant } from "../helpers/chatsHelpers";
import { ItemListChat } from "./StyledChatsList";
import { LastMessageContent } from "../../../components/Header/HeaderOptions/headerOptionsStyled";

function ChatsListItem({ chat, setNewMessageDialog }) {
    const {
        id: chatId,
        profilePicture,
        fullName,
        userId,
        content,
        chatParticipant,
        messageCount,
    } = chat;

    const dispatch = useDispatch();
    const theme = useTheme();
    const authUserID = useSelector((state) => state.user.authorizedUser.id);
    const currentChat = useSelector((state) => state.chat.currentChat);
    const [unreadCounter, setUnreadCounter] = useState(messageCount);

    function handlerChat(event, chatId, participants, userId) {
        setUnreadCounter(0);
        dispatch(resetCurrentChat());
        dispatch(
            setCurrentChatCompanion(setChatParticipant(participants, userId))
        );
        dispatch(getChat(chatId));
        dispatch(openPageChat());
        dispatch(deleteTemporaryParticipant());
        setNewMessageDialog(false);
    }

    function isActiveItem(id) {
        if (id && currentChat?.id) return currentChat.id === id;
    }

    useEffect(() => {
        setUnreadCounter(messageCount);
    }, [messageCount]);

    return (
        <ItemListChat
            id={`chat${chatId}`}
            key={chatId}
            onClick={(event) =>
                handlerChat(event, chatId, chatParticipant, userId)
            }
            sx={{
                backgroundColor: isActiveItem(chatId)
                    ? theme.palette.hoverColor.secondary
                    : "none",
            }}>
            <Link className="search__user-link">
                <Tooltip
                    title={
                        isAuthUser(authUserID, userId)
                            ? chatParticipant[0].fullName
                            : fullName
                    }>
                    <Badge badgeContent={unreadCounter} color="primary">
                        <Avatar
                            sx={{ minWidth: "40px", minHeight: "40px" }}
                            alt="user icon"
                            src={
                                isAuthUser(authUserID, userId)
                                    ? chatParticipant[0].profilePicture
                                    : profilePicture
                            }></Avatar>
                    </Badge>
                </Tooltip>
                <Box className="searh__user-text">
                    <Typography
                        color={theme.palette.textColor.content}
                        sx={{ lineHeight: 1 }}>
                        {isAuthUser(authUserID, userId)
                            ? chatParticipant[0].fullName
                            : fullName}{" "}
                        {chatParticipant.length > 1 && (
                            <Typography
                                variant="span"
                                fontWeight={600}
                                sx={{ fontSize: "13px", fontStyle: "italic" }}>
                                & {chatParticipant.length - 1} more
                            </Typography>
                        )}
                    </Typography>
                    <LastMessageContent>
                        {isAuthUser(authUserID, userId)
                            ? "You: " + content
                            : content}
                    </LastMessageContent>
                </Box>
            </Link>
        </ItemListChat>
    );
}

export default ChatsListItem;
