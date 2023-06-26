import React from "react";
import {
    Box,
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
    Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import AppsIcon from "@mui/icons-material/Apps";
import { default as AddOption } from "@mui/icons-material/Add";

function HeaderOptions() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNotifications, setAnchorElNotifications] =
        React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(document.getElementById("test")); // Устанавливаем anchorEl равным <div className="test"></div>
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(document.getElementById("test")); // Устанавливаем anchorEl равным <div className="test"></div>
    };

    const handleOpenNotificationsMenu = (event) => {
        setAnchorElNotifications(document.getElementById("test")); // Устанавливаем anchorEl равным <div className="test"></div>
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseNotificationsMenu = () => {
        setAnchorElNotifications(null);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Tooltip
                title="Create"
                sx={{
                    display: {
                        xs: "flex",
                        lg: "none",
                    },
                    p: { xs: "4px", sm: 1 },
                }}
            >
                <IconButton onClick={handleOpenNavMenu}>
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
                    p: { xs: "4px", sm: 1 },
                }}
            >
                <IconButton onClick={handleOpenNavMenu}>
                    <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                        <AppsIcon style={{ color: "black" }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Tooltip title="Messenger" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={handleOpenNotificationsMenu}>
                    <Badge badgeContent={4} color="secondary">
                        <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                            <ForumIcon style={{ color: "black" }} />
                        </Avatar>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Tooltip title="Notifications" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={handleOpenNotificationsMenu}>
                    <Badge badgeContent={3} color="secondary">
                        <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                            <NotificationsIcon style={{ color: "black" }} />
                        </Avatar>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Tooltip title="Account" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuSWkkjE4xNHNDS8YGjdMR_j4CziOv0YT9lEfDXY_K&s"
                    />
                </IconButton>
            </Tooltip>
            <div className="test" id="test"></div>{" "}
            {/* Добавляем id для <div className="test"></div> */}
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

export default HeaderOptions;
