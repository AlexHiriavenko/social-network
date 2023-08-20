import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Menu } from "@mui/material";
import HeaderChatIcon from "./HeaderChatIcon";
import MessengerHeader from "./MessengerHeader";
import ChatsList from "./ChatsList";
import Chat from "./Chat";

function HeaderMessageOptions() {
    const theme = useTheme();
    const [anchorMessageMenu, setAnchorMessageMenu] = useState(null);

    const toggleMenu = () =>
        anchorMessageMenu
            ? setAnchorMessageMenu(null)
            : setAnchorMessageMenu(document.querySelector(".anchor-menu"));

    const open = useSelector((state) => state.chat.isOpened);

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
                        className: "header__options-drop-menu",
                        style: {
                            minHeight: "160px",
                            backgroundColor: theme.palette.backgroundColor.section,
                        },
                    },
                }}
            >
                <MessengerHeader toggleMenu={toggleMenu} />
                {!open && <ChatsList />}
                {open && <Chat />}
            </Menu>
        </>
    );
}

export default HeaderMessageOptions;
