import React from "react";
import {
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
    Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function HeaderNotifyOptions() {
    const [anchorElNotifications, setAnchorElNotifications] =
        React.useState(null);

    const handleOpenMenu = (setAnchor) => () => {
        setAnchor(document.querySelector(".anchor-menu"));
    };

    const handleCloseMenu = (setAnchor) => () => {
        setAnchor(null);
    };

    return (
        <>
            <Tooltip title="Notifications" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={handleOpenMenu(setAnchorElNotifications)}>
                    <Badge badgeContent={3} color="secondary">
                        <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                            <NotificationsIcon style={{ color: "black" }} />
                        </Avatar>
                    </Badge>
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
        </>
    );
}

export default HeaderNotifyOptions;
