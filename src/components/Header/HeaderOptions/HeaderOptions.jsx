import React from "react";
import { Box, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import AppsIcon from "@mui/icons-material/Apps";
import { default as AddOption } from "@mui/icons-material/Add";

function HeaderOptions() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNotifications, setAnchorElNotifications] = React.useState(null);

    const handleOpenMenu = (setAnchor) => () => {
        setAnchor(document.querySelector(".anchor-menu"));
    };

    const handleCloseMenu = (setAnchor) => () => {
        setAnchor(null);
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
                <IconButton onClick={handleOpenMenu(setAnchorElNotifications)}>
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
                <IconButton onClick={handleOpenMenu(setAnchorElNotifications)}>
                    <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                        <AppsIcon style={{ color: "black" }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Tooltip title="Messenger" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={handleOpenMenu(setAnchorElNotifications)}>
                    <Badge badgeContent={4} color="secondary">
                        <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                            <ForumIcon style={{ color: "black" }} />
                        </Avatar>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Tooltip title="Notifications" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={handleOpenMenu(setAnchorElNotifications)}>
                    <Badge badgeContent={3} color="secondary">
                        <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                            <NotificationsIcon style={{ color: "black" }} />
                        </Avatar>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Tooltip title="Account" sx={{ p: { xs: "4px", sm: 1 } }} className="anchor-menu">
                <IconButton onClick={handleOpenMenu(setAnchorElUser)}>
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
                onClose={handleCloseMenu(setAnchorElNotifications)}
            >
                <MenuItem onClick={handleCloseMenu(setAnchorElNotifications)}>
                    <Typography textAlign="center">Notification 1</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu(setAnchorElNotifications)}>
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
                onClose={handleCloseMenu(setAnchorElUser)}
            >
                <MenuItem onClick={handleCloseMenu(setAnchorElUser)}>
                    <Typography textAlign="center">item1</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu(setAnchorElUser)}>
                    <Typography textAlign="center">item2</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default HeaderOptions;
