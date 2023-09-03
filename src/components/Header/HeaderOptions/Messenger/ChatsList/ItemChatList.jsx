import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import {
    getChat,
    setCurrentChatCompanion,
    openChat,
} from "../../../../../redux/chat.slice/chat.slice";
import { ListItem, Typography, Avatar, Box } from "@mui/material/";
import { isAuthUser, setChatParticipant } from "../../../../../pages/Chats/helpers/chatsHelpers";
import { StyledLink, LastMessageContent } from "../../headerOptionsStyled";

function ItemChatList({ chat }) {
    const { id: chatId, profilePicture, fullName, userId, content, chatParticipant } = chat;

    const dispatch = useDispatch();
    const theme = useTheme();

    const chatParticipants = useSelector((state) => state.chat.chatsParticipants);
    const authUserID = useSelector((state) => state.user.authorizedUser.id);

    function handlerChat(event, chatId, userId) {
        dispatch(setCurrentChatCompanion(setChatParticipant(chatParticipants, userId)));
        dispatch(getChat(chatId));
        dispatch(openChat());
    }

    return (
        <ListItem
            id={`chat${chatId}`}
            onClick={(event) => handlerChat(event, chatId, userId)}
            sx={{
                gap: 1,
                "&:hover": {
                    backgroundColor: theme.palette.hoverColor.secondary,
                },
            }}
        >
            <StyledLink>
                <Avatar
                    sx={{ minWidth: "40px", minHeight: "40px" }}
                    alt="user icon"
                    src={
                        isAuthUser(authUserID, userId)
                            ? chatParticipant[0].profilePicture
                            : profilePicture
                    }
                ></Avatar>
                <Box>
                    <Typography color={theme.palette.textColor.content}>
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
            </StyledLink>
        </ListItem>
    );
}

export default ItemChatList;
