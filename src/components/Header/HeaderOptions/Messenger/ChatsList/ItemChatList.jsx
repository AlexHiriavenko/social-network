import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import {
    getChat,
    setCurrentChatCompanion,
    openChat,
    setChatsParticipants,
} from "../../../../../redux/chat.slice/chat.slice";
import { ListItem, Typography, Avatar, Box, Badge } from "@mui/material/";
import {
    isAuthUser,
    setChatParticipant,
} from "../../../../../pages/Chats/helpers/chatsHelpers";
import { StyledLink, LastMessageContent } from "../../headerOptionsStyled";

function ItemChatList({ chat }) {
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
    const chatParticipants = useSelector(
        (state) => state.chat.chatsParticipants
    );
    const [unreadCounter, setUnreadCounter] = useState(messageCount);

    function handlerChat(event, chatId, participants, userId) {
        dispatch(setChatsParticipants(resetTargetCounter(chatId)));
        dispatch(
            setCurrentChatCompanion(setChatParticipant(participants, userId))
        );
        dispatch(getChat(chatId));
        dispatch(openChat());
    }

    function resetTargetCounter(id) {
        const newStateChatsParticipants = structuredClone(chatParticipants);
        const target = newStateChatsParticipants.find((el) => el.id === id);
        target.messageCount = 0;
        return newStateChatsParticipants;
    }

    useEffect(() => {
        setUnreadCounter(messageCount);
    }, [messageCount]);

    return (
        <ListItem
            id={`chat${chatId}`}
            onClick={(event) =>
                handlerChat(event, chatId, chatParticipant, userId)
            }
            sx={{
                gap: 1,
                "&:hover": {
                    backgroundColor: theme.palette.hoverColor.secondary,
                },
            }}>
            <StyledLink>
                <Badge badgeContent={unreadCounter} color="primary">
                    <Avatar
                        sx={{ minWidth: "40px", minHeight: "40px" }}
                        alt="user icon"
                        src={
                            isAuthUser(authUserID, userId)
                                ? chatParticipant[0].profilePicture
                                : profilePicture
                        }
                    />
                </Badge>
                <Box>
                    <Typography color={theme.palette.textColor.content}>
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
            </StyledLink>
        </ListItem>
    );
}

export default ItemChatList;
