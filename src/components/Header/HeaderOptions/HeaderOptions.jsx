import React from "react";
import { Box, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import AppsIcon from "@mui/icons-material/Apps";
import { default as AddOption } from "@mui/icons-material/Add";

function HeaderOptios() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNotifications, setAnchorElNotifications] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenNotificationsMenu = (event) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleCloseNotificationsMenu = () => {
        setAnchorElNotifications(null);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Tooltip
                title="Menu"
                sx={{
                    display: {
                        xs: "flex",
                        lg: "none",
                    },
                }}
            >
                <IconButton onClick={handleOpenNotificationsMenu}>
                    <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                        <AddOption style={{ color: "black" }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Tooltip
                title="Menu"
                sx={{
                    display: {
                        xs: "none",
                        lg: "flex",
                    },
                }}
            >
                <IconButton onClick={handleOpenNotificationsMenu}>
                    <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                        <AppsIcon style={{ color: "black" }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Tooltip title="Messenger">
                <IconButton onClick={handleOpenNotificationsMenu}>
                    <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                        <ForumIcon style={{ color: "black" }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
                <IconButton onClick={handleOpenNotificationsMenu}>
                    <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                        <NotificationsIcon style={{ color: "black" }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Tooltip title="Account">
                <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuSWkkjE4xNHNDS8YGjdMR_j4CziOv0YT9lEfDXY_K&s"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar-notifications"
                anchorEl={anchorElNotifications}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElNotifications)}
                onClose={handleCloseNotificationsMenu}
            >
                <MenuItem onClick={handleCloseNotificationsMenu}>
                    <Typography textAlign="center">Notification 1</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNotificationsMenu}>
                    <Typography textAlign="center">Notification 2</Typography>
                </MenuItem>
            </Menu>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">item1</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">item2</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default HeaderOptios;
