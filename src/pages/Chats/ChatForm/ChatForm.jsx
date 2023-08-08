import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, List, ListItem, TextField, Box, Avatar } from "@mui/material";
import { getChat } from "../../../redux/chat.slice/chat.slice";
import { getFriends, setFriends, setUser, getUser } from "../../../redux/user.slice/user.slice";

const ChatForm = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const authUser = useSelector((state) => state.user.authorizedUser);
    const authUserId = authUser.id;

    const currentChat = useSelector((state) => state.chat.currentChat);
    const currentChatCompanion = useSelector((state) => state.chat.currentChatCompanion);
    const { fullName, profilePicture } = currentChatCompanion;

    const messages = currentChat.messages;
    const objForCopy = messages.find((message) => message.id === authUserId);
    const newMessage = structuredClone(objForCopy);

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
            <Box sx={{ p: 2, mb: 2 }}>
                <Link
                    onClick={() => lookFriendPage(currentChatCompanion.userId)}
                    to="/profile"
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                    <Avatar
                        className="search__user-avatar"
                        sx={{ minWidth: "40px", minHeight: "40px" }}
                        alt="user icon"
                        src={profilePicture}
                    />
                    <Typography>{fullName}</Typography>
                </Link>
                <List>
                    {messages.map((message, index) => (
                        <ListItem
                            key={index}
                            sx={{ display: "flex", flexDirection: "column", mb: 1 }}
                        >
                            <Typography>
                                {message.createdDate
                                    ? new Date(message.createdDate).toLocaleString()
                                    : "unknown date"}
                            </Typography>
                            <Typography>
                                {message.createdBy ? message.createdBy : "unknown author"}
                            </Typography>
                            <img src={message.sender.profilePicture}></img>
                            <Typography
                                sx={{
                                    p: 2,
                                    minWidth: "200px",
                                    backgroundColor: "lightgrey",
                                    borderRadius: "16px",
                                }}
                            >
                                {message.content ? message.content : ""}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
                <TextField
                    label="your message"
                    variant="outlined"
                    inputRef={inputRef}
                    onKeyDown={handleKeyDown}
                />
            </Box>
        );
    }
};

export default ChatForm;
