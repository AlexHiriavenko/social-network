import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Typography, List, ListItem, TextField, Box, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { resetCurrentChat, getChat } from "../../../redux/chat.slice/chat.slice";
// import { setNewMessage } from "../../../redux/message.slice/message.slice";
import { sendMessage } from "../../../redux/message.slice/message.slice";
import { getFriends, setFriends, setUser, getUser } from "../../../redux/user.slice/user.slice";

const ChatBody = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const inputRef = useRef(null);
    const chatFormRef = useRef(null);

    const currentChat = useSelector((state) => state.chat.currentChat);
    const messages = currentChat.messages || [];

    // в конец чата
    useEffect(() => {
        if (chatFormRef.current) {
            chatFormRef.current.scrollTop = chatFormRef.current.scrollHeight;
        }
    }, [messages]);

    // обнуление стейта текущего чата при размонтировании
    useEffect(() => {
        return () => {
            dispatch(resetCurrentChat());
        };
    }, []);

    const authUser = useSelector((state) => state.user.authorizedUser);
    const authUserId = authUser.id;

    const currentChatCompanion = useSelector((state) => state.chat.currentChatCompanion);
    const { fullName, profilePicture } = currentChatCompanion;

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

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && inputRef.current.value.trim()) {
            const inputValue = inputRef.current.value.trim();
            const newMessage = {
                id: 0,
                content: inputValue,
                sender: authUser,
                chat: currentChat,
            };
            inputRef.current.value = "";
            dispatch(sendMessage(newMessage))
                .then(() => dispatch(getChat(currentChat.id)))
                .catch((error) => {
                    console.error("Error sending message:", error);
                });
        }
    };

    const handleClickSend = (event) => {
        if (inputRef.current.value.trim()) {
            const inputValue = inputRef.current.value.trim();
            const newMessage = {
                id: 0,
                content: inputValue,
                sender: authUser,
                chat: currentChat,
            };
            inputRef.current.value = "";
            dispatch(sendMessage(newMessage))
                .then(() => dispatch(getChat(currentChat.id)))
                .catch((error) => {
                    console.error("Error sending message:", error);
                });
        }
    };

    if (messages[0].createdBy) {
        return (
            <Box ref={chatFormRef} sx={{ pl: 2, pr: 2 }} className="chat-body">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                        backgroundColor: theme.palette.backgroundColor.section,
                        paddingTop: "10px",
                        paddingBottom: "10px",
                    }}
                >
                    <Link
                        onClick={() => lookFriendPage(currentChatCompanion.userId)}
                        to="/profile"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
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
                    <Avatar
                        sx={{
                            bgcolor: theme.palette.hoverColor.dark,
                            minWidth: "40px",
                            minHeight: "40px",
                            cursor: "pointer",
                        }}
                        onClick={() => dispatch(resetCurrentChat())}
                    >
                        <CloseIcon sx={{ color: theme.palette.textColor.content }} />
                    </Avatar>
                </Box>
                <List className="chat-body__list">
                    {messages.map((message, index) => (
                        <ListItem
                            className={
                                isAuthUser(authUserId, message.sender.id)
                                    ? "chat-body__item--authUser"
                                    : "chat-body__item--chatPartner"
                            }
                            key={index}
                        >
                            <Typography
                                sx={{
                                    width: "100%",
                                    textAlign: "center",
                                    color: theme.palette.textColor.secondary,
                                }}
                            >
                                {message.createdDate
                                    ? new Date(message.createdDate).toLocaleString()
                                    : "unknown date"}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Avatar
                                    sx={{ minWidth: "40px", minHeight: "40px" }}
                                    alt="user icon"
                                    src={message.sender.profilePicture}
                                ></Avatar>
                                <Typography
                                    className={
                                        isAuthUser(authUserId, message.sender.id)
                                            ? "message-text-authUser"
                                            : "messege-text-chatPartner"
                                    }
                                    sx={{
                                        p: 2,
                                        minWidth: "200px",
                                        borderRadius: "16px",
                                    }}
                                >
                                    {message.content ? message.content : ""}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        mt: 2,
                    }}
                >
                    <TextField
                        sx={{
                            width: "300px",
                            maxWidth: "98%",
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
                    <Avatar
                        sx={{
                            bgcolor: theme.palette.hoverColor.secondary,
                            minWidth: "40px",
                            minHeight: "40px",
                            cursor: "pointer",
                            p: 1,
                            boxSizing: "content-box",
                        }}
                        onClick={handleClickSend}
                    >
                        <SendIcon fontSize="large" color="primary" />
                    </Avatar>
                </Box>
            </Box>
        );
    }
};

export default ChatBody;
