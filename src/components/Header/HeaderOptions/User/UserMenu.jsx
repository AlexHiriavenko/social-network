import React from "react";
import { Link } from "react-router-dom";
import { Typography, Menu, Avatar } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    getFriends,
    setAuthorizedUser,
    setFriends,
    setUser,
} from "../../../../redux/user.slice/user.slice";
import GroupIcon from "@mui/icons-material/Group";
import { UserMenuItemStyled } from "../headerOptionsStyled";

function UserMenu(props) {
    const theme = useTheme();
    const { anchor, toggleMenu, toggleDisplayModeMenu, logOut } = props;

    const dispatch = useDispatch();
    let authorizedUser = useSelector((state) => state.user.authorizedUser);

    function showAuthorizedUser() {
        if (authorizedUser == null) {
            dispatch(setAuthorizedUser(JSON.parse(localStorage.getItem("authorizedUser"))));
            authorizedUser = JSON.parse(localStorage.getItem("authorizedUser"));
        }
        if (authorizedUser) {
            dispatch(setUser(authorizedUser));
            localStorage.setItem("user", JSON.stringify(authorizedUser));
        }
        window.scrollTo({ top: 0, behavior: "smooth" });

        const userFriendsResponse = dispatch(getFriends(authorizedUser.id));
        userFriendsResponse
            .then((data) => {
                if (data.payload) {
                    dispatch(setFriends(data.payload));
                    localStorage.setItem("friends", JSON.stringify(data.payload));
                }
            })
            .catch((error) => console.log(error.message));
    }

    return (
        <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchor}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            // keepMounted
            open={Boolean(anchor)}
            onClose={toggleMenu}
            slotProps={{
                paper: {
                    className: "header__options-drop-menu",
                    style: {
                        backgroundColor: theme.palette.backgroundColor.section,
                    },
                },
            }}
        >
            <UserMenuItemStyled onClick={toggleMenu}>
                <Link
                    className="header__menu-item-link"
                    to={"/profile"}
                    onClick={showAuthorizedUser}
                >
                    <Avatar
                        sx={{ minWidth: "40px", minHeight: "40px" }}
                        alt="user icon"
                        src={
                            authorizedUser
                                ? authorizedUser.profilePicture
                                : "https://www.facebook.com/images/mercury/clients/messenger/threadlist/NewMessage.png"
                        }
                    />
                    <Typography fontWeight={700} color={theme.palette.textColor.content}>
                        My Profile
                    </Typography>
                </Link>
            </UserMenuItemStyled>
            <UserMenuItemStyled onClick={toggleMenu}>
                <Link className="header__menu-item-link" to={"/friends/home"}>
                    <GroupIcon className="header__menu-item-icon" />
                    <Typography fontWeight={700} color={theme.palette.textColor.content}>
                        Friends
                    </Typography>
                </Link>
            </UserMenuItemStyled>
            <UserMenuItemStyled onClick={toggleDisplayModeMenu}>
                <NightsStayIcon className="header__menu-item-icon" />
                <Typography fontWeight={700} color={theme.palette.textColor.content}>
                    Display Mode
                </Typography>
                <ArrowForwardIosIcon sx={{ ml: "auto", color: "rgb(101, 103, 107)" }} />
            </UserMenuItemStyled>
            <UserMenuItemStyled onClick={logOut}>
                <ExitToAppIcon className="header__menu-item-icon" />
                <Typography fontWeight={700} color={theme.palette.textColor.content}>
                    Log Out
                </Typography>
            </UserMenuItemStyled>
        </Menu>
    );
}

export default UserMenu;
