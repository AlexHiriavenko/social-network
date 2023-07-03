import React from "react";
import { Link } from "react-router-dom";
import { Typography, Menu, Avatar, MenuItem } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NightsStayIcon from "@mui/icons-material/NightsStay";

function UserMenu(props) {
    const { anchor, toggleMenu, toggleDisplayModeMenu, logOut } = props;
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
                },
            }}
        >
            <MenuItem onClick={toggleMenu}>
                <Link className="header__menu-item-link" to={"/profile"}>
                    <Avatar
                        sx={{ minWidth: "40px", minHeight: "40px" }}
                        alt="user icon"
                        src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
                    />
                    <Typography className="header__menu-item-text">My Profile</Typography>
                </Link>
            </MenuItem>
            <MenuItem
                onClick={toggleDisplayModeMenu}
                className="header__menu-item"
                sx={{ mt: "10px" }}
            >
                <NightsStayIcon className="header__menu-item-icon" />
                <Typography className="header__menu-item-text">Display Mode</Typography>
            </MenuItem>
            <MenuItem onClick={logOut} className="header__menu-item" sx={{ mt: "10px" }}>
                <ExitToAppIcon className="header__menu-item-icon" />
                <Typography className="header__menu-item-text">Log Out</Typography>
            </MenuItem>
        </Menu>
    );
}

export default UserMenu;
