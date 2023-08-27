import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, Typography, Avatar } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { closeAddUserToChatModal } from "../../../redux/modal.slice/modal.slice";
import { sendMessage } from "../../../redux/message.slice/message.slice";
import { getChat, addToChatNewUser } from "../../../redux/chat.slice/chat.slice";

function UsersListGlobal(props) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const authUser = useSelector((state) => state.user.authorizedUser);
    const currentChat = useSelector((state) => state.chat.currentChat);
    console.log(currentChat);

    function handleAddUser(id = 0, fullName, newUserId) {
        const newMessage = {
            id: id,
            content: `${authUser.fullName} add to chat new participant: ${fullName}`,
            sender: authUser,
            chat: currentChat,
        };
        console.log(`url запрос на /chats/${currentChat.id}/participants/${newUserId}`);

        dispatch(addToChatNewUser({ chatId: currentChat.id, userId: newUserId }))
            .then(() => dispatch(closeAddUserToChatModal()))
            .then(() => dispatch(sendMessage(newMessage)))
            .then(() => dispatch(getChat(currentChat.id)))
            .catch((error) => {
                console.error("Error sending message:", error);
            });
    }

    return (
        <List sx={{ minHeight: "340px" }}>
            {props.users?.map((user) => (
                <ListItem
                    key={user.id}
                    sx={{
                        cursor: "pointer",
                        gap: 1,
                        "&:hover": {
                            backgroundColor: theme.palette.hoverColor.main,
                        },
                    }}
                    onClick={() => handleAddUser(0, user.fullName, +user.id)}
                >
                    <Link className="search__user-link">
                        <Avatar
                            className="search__user-avatar"
                            sx={{ minWidth: "40px", minHeight: "40px" }}
                            alt="user icon"
                            src={user.profilePicture}
                        ></Avatar>
                        <Typography
                            className="search__user-name"
                            color={theme.palette.textColor.content}
                        >
                            {user.fullName}
                        </Typography>
                    </Link>
                </ListItem>
            ))}
        </List>
    );
}

export default UsersListGlobal;
