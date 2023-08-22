import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Menu } from "@mui/material";
import HeaderChatIcon from "./HeaderChatIcon";
import MessengerHeader from "./MessengerHeader";
import ChatsList from "./ChatsList";
import ChatHeader from "../../../../pages/Chats/ChatBody/ChatHeader";
import Chat from "./Chat";

function HeaderMessageOptions() {
    const theme = useTheme();
    const [anchorMessageMenu, setAnchorMessageMenu] = useState(null);

    const toggleMenu = () =>
        anchorMessageMenu
            ? setAnchorMessageMenu(null)
            : setAnchorMessageMenu(document.querySelector(".anchor-menu"));

    const closeMenu = () => setAnchorMessageMenu(null);

    const open = useSelector((state) => state.chat.isOpened);
    const { messages } = useSelector((state) => state.chat.currentChat);
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <HeaderChatIcon toggleMenu={toggleMenu} />
            <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorMessageMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                // keepMounted
                open={Boolean(anchorMessageMenu)}
                onClose={toggleMenu}
                slotProps={{
                    paper: {
                        ref: chatRef,
                        className: "header__options-drop-menu",
                        style: {
                            backgroundColor: theme.palette.backgroundColor.section,
                            maxHeight: "500px",
                        },
                    },
                }}
            >
                {!open && <MessengerHeader toggleMenu={toggleMenu} />}
                {!open && <ChatsList />}
                {open && <ChatHeader closeMenu={closeMenu} />}
                {open && <Chat />}
            </Menu>
        </>
    );
}

export default HeaderMessageOptions;
