import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../../redux/login.slice/login.slice";
import { IconButton, Avatar, Tooltip } from "@mui/material";
import DarkModeMenu from "./DarkModeMenu";
import UserMenu from "./UserMenu";
import { setAuthorizedUser, setFriends, setUser } from "../../../../redux/user.slice/user.slice.js";

function HeaderUserOtions() {
    const dispatch = useDispatch();

    const [anchorUserMenu, setAnchorUserMenu] = useState(null);
    const [anchorDisplayModeMenu, setAnchorDisplayModeMenu] = useState(null);
    const authorizedUser = useSelector((state) => state.user.authorizedUser);

    const handleLogOut = (event) => {
        dispatch(logOut());
        dispatch(setAuthorizedUser(null));
        dispatch(setUser(null));
        dispatch(setFriends([]));
    };

    const toggleMenu = () =>
        anchorUserMenu
            ? setAnchorUserMenu(null)
            : setAnchorUserMenu(document.querySelector(".anchor-menu"));

    const toggleDisplayModeMenu = () => {
        anchorDisplayModeMenu
            ? setAnchorDisplayModeMenu(null)
            : setAnchorDisplayModeMenu(document.querySelector(".anchor-menu")),
            setAnchorUserMenu(null);
    };

    const goPrevMenu = () => {
        setAnchorDisplayModeMenu(null);
        setAnchorUserMenu(document.querySelector(".anchor-menu"));
    };

    return (
        <>
            <Tooltip title="Account" sx={{ p: { xs: "4px", sm: 1 } }} className="anchor-menu">
                <IconButton onClick={toggleMenu} sx={({ py: 1 }, { px: { xs: 0.5, sm: 1 } })}>
                    <Avatar
                        sx={{ minWidth: "40px", minHeight: "40px" }}
                        alt="user icon"
                        src={authorizedUser ? authorizedUser.profilePicture : ""}
                    />
                </IconButton>
            </Tooltip>
            <UserMenu
                anchor={anchorUserMenu}
                toggleMenu={toggleMenu}
                toggleDisplayModeMenu={toggleDisplayModeMenu}
                logOut={handleLogOut}
            />
            <DarkModeMenu
                anchor={anchorDisplayModeMenu}
                toggleMenu={toggleDisplayModeMenu}
                goBack={goPrevMenu}
            />
        </>
    );
}

export default HeaderUserOtions;
