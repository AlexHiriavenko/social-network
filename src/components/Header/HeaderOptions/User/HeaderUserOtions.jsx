import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../../redux/login.slice/login.slice";
import {
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import NightsStayIcon from "@mui/icons-material/NightsStay";

function HeaderUserOtions() {
    const dispatch = useDispatch();
    const handleLogOut = (event) => {
        dispatch(logOut());
    };

    const [anchorUserMenu, setAnchorUserMenu] = React.useState(null);
    const toggleMenu = () =>
        anchorUserMenu
            ? setAnchorUserMenu(null)
            : setAnchorUserMenu(document.querySelector(".anchor-menu"));

    return (
        <>
            <Tooltip
                title="Account"
                sx={{ p: { xs: "4px", sm: 1 } }}
                className="anchor-menu"
            >
                <IconButton
                    onClick={toggleMenu}
                    sx={
                        ({ pt: 1, pb: 1 },
                        { pl: { xs: 0.5, sm: 1 }, pr: { xs: 0.5, sm: 1 } })
                    }
                >
                    <Avatar
                        sx={{ minWidth: "40px", minHeight: "40px" }}
                        alt="user icon"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuSWkkjE4xNHNDS8YGjdMR_j4CziOv0YT9lEfDXY_K&s"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorUserMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                // keepMounted
                open={Boolean(anchorUserMenu)}
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
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuSWkkjE4xNHNDS8YGjdMR_j4CziOv0YT9lEfDXY_K&s"
                        />
                        <Typography className="header__menu-item-text">
                            My Profile
                        </Typography>
                    </Link>
                </MenuItem>
                <MenuItem
                    onClick={toggleMenu}
                    className="header__menu-item"
                    sx={{ mt: "10px" }}
                >
                    <NightsStayIcon className="header__menu-item-icon" />
                    <Typography className="header__menu-item-text">
                        Display Theme
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={toggleMenu}
                    className="header__menu-item"
                    sx={{ mt: "10px" }}
                >
                    <Link className="header__menu-item-link" to={"/profile"}>
                        <AnnouncementIcon className="header__menu-item-icon" />
                        <Typography className="header__menu-item-text">
                            Give feedback
                        </Typography>
                    </Link>
                </MenuItem>
                <MenuItem
                    onClick={handleLogOut}
                    className="header__menu-item"
                    sx={{ mt: "10px" }}
                >
                    <ExitToAppIcon className="header__menu-item-icon" />
                    <Typography className="header__menu-item-text">
                        Log Out
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default HeaderUserOtions;
