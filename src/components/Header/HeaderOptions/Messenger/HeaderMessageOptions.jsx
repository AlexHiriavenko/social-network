import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Menu } from "@mui/material";
import HeaderChatIcon from "./HeaderChatIcon";
import ChatHead from "./CurrentChat/ChatHead";
import ChatsList from "./ChatsList/ChatsList";
import ChatHeader from "../../../../pages/Chats/ChatBody/ChatHeader";
import CurrentChat from "./CurrentChat/CurrentChat";
import NewChat from "./NewChat/NewChat";

function HeaderMessageOptions() {
    const theme = useTheme();

    const [newMessageModal, setNewMessageModal] = useState(false);
    const [anchorMessageMenu, setAnchorMessageMenu] = useState(null);

    const open = useSelector((state) => state.chat.isOpened);
    const { messages } = useSelector((state) => state.chat.currentChat) || [];
    const chatRef = useRef(null);

    const toggleMenu = () =>
        anchorMessageMenu
            ? setAnchorMessageMenu(null)
            : setAnchorMessageMenu(document.querySelector(".anchor-menu"));

    const closeMenu = () => {
        setAnchorMessageMenu(null);
        setNewMessageModal(false);
    };

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
                onClose={closeMenu}
                slotProps={{
                    paper: {
                        ref: chatRef,
                        className: "header__options-drop-menu",
                        style: {
                            backgroundColor:
                                theme.palette.backgroundColor.section,
                            minHeight: "500px",
                        },
                    },
                }}>
                {newMessageModal && (
                    <NewChat setNewMessageModal={setNewMessageModal} />
                )}
                {!open && !newMessageModal && (
                    <ChatHead
                        toggleMenu={toggleMenu}
                        setNewMessageModal={setNewMessageModal}
                    />
                )}
                {!open && !newMessageModal && <ChatsList />}
                {open && <ChatHeader closeMenu={closeMenu} />}
                {open && <CurrentChat />}
            </Menu>
        </>
    );
}

export default HeaderMessageOptions;
