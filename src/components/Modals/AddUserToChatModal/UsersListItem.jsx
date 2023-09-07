import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography, Avatar } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { closeAddUserToChatModal } from "../../../redux/modal.slice/modal.slice";
import { sendMessage } from "../../../redux/message.slice/message.slice";
import {
    getChat,
    addToChatNewUser,
} from "../../../redux/chat.slice/chat.slice";

function UsersListItem({ user, setAlertMessage }) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const authUser = useSelector((state) => state.user.authorizedUser);
    const currentChat = useSelector((state) => state.chat.currentChat);
    const { users } = currentChat;
    const usersIdies = users.map((user) => user.id);
    const isNewUser = (newUserId) => !usersIdies.includes(+newUserId);

    function handleAddUser(id = 0, fullName, newUserId) {
        if (isNewUser(newUserId)) {
            setAlertMessage(false);
            const newMessage = {
                id: id,
                content: `${authUser.fullName} add to chat new participant: ${fullName}`,
                chatId: currentChat.id,
            };
            dispatch(
                addToChatNewUser({ chatId: currentChat.id, userId: newUserId })
            )
                .then(() => dispatch(closeAddUserToChatModal()))
                .then(() => dispatch(sendMessage(newMessage)))
                .then(() => dispatch(getChat(currentChat.id)))
                .catch((error) => {
                    console.error("Error sending message:", error);
                });
        } else {
            setAlertMessage(true);
        }
    }

    return (
        <ListItem
            sx={{
                cursor: "pointer",
                gap: 1,
                "&:hover": {
                    backgroundColor: theme.palette.hoverColor.main,
                },
            }}
            onClick={() => handleAddUser(0, user.fullName, +user.id)}>
            <Link className="search__user-link">
                <Avatar
                    className="search__user-avatar"
                    sx={{ minWidth: "40px", minHeight: "40px" }}
                    alt="user icon"
                    src={user.profilePicture}></Avatar>
                <Typography color={theme.palette.textColor.content}>
                    {user.fullName}
                </Typography>
            </Link>
        </ListItem>
    );
}

export default UsersListItem;
