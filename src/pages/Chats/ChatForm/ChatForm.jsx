import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
    Typography,
    List,
    ListItem,
    TextField,
    Box,
    Avatar,
} from "@mui/material";
import { resetCurrentChat } from "../../../redux/chat.slice/chat.slice";
import {
    getFriends,
    setFriends,
    setUser,
    getUser,
} from "../../../redux/user.slice/user.slice";

const ChatForm = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        return () => dispatch(resetCurrentChat());
    }, []);

    const authUser = useSelector((state) => state.user.authorizedUser);
    const authUserId = authUser.id;

    const currentChat = useSelector((state) => state.chat.currentChat);
    const currentChatCompanion = useSelector(
        (state) => state.chat.currentChatCompanion
    );
    const { fullName, profilePicture } = currentChatCompanion;

    const messages = currentChat.messages;
    const objForCopy = messages.find((message) => message.id === authUserId);
    const newMessage = structuredClone(objForCopy);

    const isAuthUser = (authUserId, userId) => {
        return authUserId === userId;
    };

    function lookFriendPage(id) {
        const userFriendsResponse = dispatch(getFriends(id));
        userFriendsResponse
            .then((data) => {
                dispatch(setFriends(data.payload));
                localStorage.setItem("friends", JSON.stringify(data.payload));
            })
            .catch((error) => console.log(error.message));

        if (id === authUser.id) {
            dispatch(setUser(authUser));
            localStorage.setItem("user", JSON.stringify(authUser));
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const lookedFriend = dispatch(getUser(id));
            lookedFriend
                .then((data) => {
                    dispatch(setUser(data.payload));
                    localStorage.setItem("user", JSON.stringify(data.payload));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                })
                .catch((error) => console.log(error.message));
        }
    }

    console.log(newMessage);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && inputRef.current) {
            const inputValue = inputRef.current.value;
            newMessage.content = inputValue;
            console.log(newMessage);
            console.log("Input value:", inputValue);
        }
    };

    if (messages[0].createdBy) {
        return (
            <Box sx={{ p: 2, mb: 2 }} className="chat-body">
                <Link
                    onClick={() => lookFriendPage(currentChatCompanion.userId)}
                    to="/profile"
                    style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar
                        className="search__user-avatar"
                        sx={{ minWidth: "40px", minHeight: "40px" }}
                        alt="user icon"
                        src={profilePicture}
                    />
                    <Typography sx={{ color: theme.palette.textColor.main }}>
                        {fullName}
                    </Typography>
                </Link>
                <List className="chat-body__list">
                    {messages.map((message, index) => (
                        <ListItem
                            className={
                                isAuthUser(authUserId, message.sender.id)
                                    ? "chat-body__item--authUser"
                                    : "chat-body__item--chatPartner"
                            }
                            key={index}>
                            <Typography
                                sx={{
                                    width: "100%",
                                    textAlign: "center",
                                    color: theme.palette.textColor.secondary,
                                }}>
                                {message.createdDate
                                    ? new Date(
                                          message.createdDate
                                      ).toLocaleString()
                                    : "unknown date"}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}>
                                <Avatar
                                    sx={{ minWidth: "40px", minHeight: "40px" }}
                                    alt="user icon"
                                    src={
                                        message.sender.profilePicture
                                    }></Avatar>
                                <Typography
                                    className={
                                        isAuthUser(
                                            authUserId,
                                            message.sender.id
                                        )
                                            ? "message-text-authUser"
                                            : "messege-text-chatPartner"
                                    }
                                    sx={{
                                        p: 2,
                                        minWidth: "200px",
                                        borderRadius: "16px",
                                    }}>
                                    {message.content ? message.content : ""}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <TextField
                    sx={{
                        mt: 8,
                        minWidth: "300px",
                        "& input": {
                            color: theme.palette.textColor.main,
                            border: `1px solid ${theme.palette.textColor.secondary}`,
                            "&:hover": {
                                border: `1px solid ${theme.palette.textColor.secondary}`,
                                outline: `1px solid ${theme.palette.textColor.secondary}`,
                            },
                            "&:focus": {
                                border: "none",
                                outline: "none",
                            },
                        },
                    }}
                    inputProps={{
                        style: {
                            color: theme.palette.textColor.main,
                        },
                    }}
                    label="your message"
                    InputLabelProps={{
                        style: {
                            color: theme.palette.textColor.secondary,
                        },
                    }}
                    variant="outlined"
                    inputRef={inputRef}
                    onKeyDown={handleKeyDown}
                />
            </Box>
        );
    }
};

export default ChatForm;
