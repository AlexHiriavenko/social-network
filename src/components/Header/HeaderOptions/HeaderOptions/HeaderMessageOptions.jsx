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
import ForumIcon from "@mui/icons-material/Forum";

function HeaderMessageOptions() {
    const [anchorElMessenger, setAnchorElMessenger] = React.useState(null);

    const handleOpenMenu = (setAnchor) => () => {
        setAnchor(document.querySelector(".anchor-menu"));
    };

    const handleCloseMenu = (setAnchor) => () => {
        setAnchor(null);
    };
    return (
        <>
            <Tooltip title="Messenger" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={handleOpenMenu(setAnchorElMessenger)}>
                    <Badge badgeContent={4} color="secondary">
                        <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                            <ForumIcon style={{ color: "black" }} />
                        </Avatar>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElMessenger}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElMessenger)}
                onClose={handleCloseMenu(setAnchorElMessenger)}
            >
                <MenuItem onClick={handleCloseMenu(setAnchorElMessenger)}>
                    <Typography textAlign="center">chat 1</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu(setAnchorElMessenger)}>
                    <Typography textAlign="center">chat 2</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu(setAnchorElMessenger)}>
                    <Typography textAlign="center">chat 3</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default HeaderMessageOptions;
