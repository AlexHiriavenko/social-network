import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import {
    getChat,
    setCurrentChatCompanion,
    openPageChat,
} from "../../../redux/chat.slice/chat.slice";
import { Typography, Avatar, Box, Tooltip } from "@mui/material/";
import { Link } from "react-router-dom";
import { deleteTemporaryParticipant } from "../../../redux/chat.slice/chat.slice";
import { isAuthUser, setChatParticipant } from "../helpers/chatsHelpers";
import { ItemListChat } from "./StyledChatsList";
import { LastMessageContent } from "../../../components/Header/HeaderOptions/headerOptionsStyled";

function ChatsListItem({ chat, setNewMessageDialog }) {
    const { id: chatId, profilePicture, fullName, userId, content, chatParticipant } = chat;

    const dispatch = useDispatch();
    const theme = useTheme();
    const authUserID = useSelector((state) => state.user.authorizedUser.id);
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
        <ItemListChat
            id={`chat${chatId}`}
            key={chatId}
            onClick={(event) => handlerChat(event, chatId, chatParticipant, userId)}
            sx={{
                backgroundColor: isActiveItem(chatId) ? theme.palette.hoverColor.secondary : "none",
            }}
        >
            <Link className="search__user-link">
                <Tooltip
                    title={isAuthUser(authUserID, userId) ? chatParticipant[0].fullName : fullName}
                >
                    <Avatar
                        sx={{ minWidth: "40px", minHeight: "40px" }}
                        alt="user icon"
                        src={
                            isAuthUser(authUserID, userId)
                                ? chatParticipant[0].profilePicture
                                : profilePicture
                        }
                    ></Avatar>
                </Tooltip>
                <Box className="searh__user-text">
                    <Typography color={theme.palette.textColor.content} sx={{ lineHeight: 1 }}>
                        {isAuthUser(authUserID, userId) ? chatParticipant[0].fullName : fullName}{" "}
                        {chatParticipant.length > 1 && (
                            <Typography variant="span" sx={{ fontSize: "13px" }}>
                                & {chatParticipant.length - 1} more
                            </Typography>
                        )}
                    </Typography>
                    <LastMessageContent>
                        {isAuthUser(authUserID, userId) ? "You: " + content : content}
                    </LastMessageContent>
                </Box>
            </Link>
        </ItemListChat>
    );
}

export default ChatsListItem;
