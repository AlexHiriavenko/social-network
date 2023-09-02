import { useState, useEffect } from "react";
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
    const [alertMessage, setAlertMessage] = useState(false);

    const authUser = useSelector((state) => state.user.authorizedUser);
    const currentChat = useSelector((state) => state.chat.currentChat);
    const { users } = currentChat;
    const userIdies = users.map((user) => user.id);
    const isNewUser = (id) => !userIdies.includes(+id);

    function handleAddUser(id = 0, fullName, newUserId) {
        if (isNewUser(newUserId)) {
            setAlertMessage(false);
            const newMessage = {
                id: id,
                content: `${authUser.fullName} add to chat new participant: ${fullName}`,
                chatId: currentChat.id,
            };
            dispatch(addToChatNewUser({ chatId: currentChat.id, userId: newUserId }))
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

    useEffect(() => {
        return () => {
            setAlertMessage(false);
        };
    }, []);

    return (
        <>
            {alertMessage && (
                <Typography color={"error"} align="center">
                    This user is already in the chat! It is not possible to add an existing user
                    again.
                </Typography>
            )}
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
        </>
    );
}

export default UsersListGlobal;
