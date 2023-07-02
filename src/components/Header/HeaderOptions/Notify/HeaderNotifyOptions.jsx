import React from "react";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function HeaderNotifyOptions() {
    const [anchorNotifyMenu, setAnchorNotifyMenu] = React.useState(null);
    const toggleMenu = () =>
        anchorNotifyMenu
            ? setAnchorNotifyMenu(null)
            : setAnchorNotifyMenu(document.querySelector(".anchor-menu"));

    return (
        <>
            <Tooltip title="Notifications" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton
                    onClick={toggleMenu}
                    sx={({ pt: 1, pb: 1 }, { pl: { xs: 0.5, sm: 1 }, pr: { xs: 0.5, sm: 1 } })}
                >
                    <Badge badgeContent={3} color="secondary">
                        <Avatar sx={{ bgcolor: "#F0F2F5", minWidth: "40px", minHeight: "40px" }}>
                            <NotificationsIcon style={{ color: "black" }} />
                        </Avatar>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorNotifyMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                // keepMounted
                open={Boolean(anchorNotifyMenu)}
                onClose={toggleMenu}
                slotProps={{
                    paper: {
                        className: "header__options-drop-menu",
                    },
                }}
            >
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center">Notification 1</Typography>
                </MenuItem>
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center">Notification 2</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default HeaderNotifyOptions;
