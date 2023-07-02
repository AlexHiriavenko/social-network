import React from "react";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Badge } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";

function HeaderMessageOptions() {
    const [anchorMessageMenu, setAnchorMessageMenu] = React.useState(null);
    const toggleMenu = () =>
        anchorMessageMenu
            ? setAnchorMessageMenu(null)
            : setAnchorMessageMenu(document.querySelector(".anchor-menu"));

    return (
        <>
            <Tooltip title="Messenger" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton
                    onClick={toggleMenu}
                    sx={({ pt: 1, pb: 1 }, { pl: { xs: 0.5, sm: 1 }, pr: { xs: 0.5, sm: 1 } })}
                >
                    <Badge badgeContent={4} color="secondary">
                        <Avatar sx={{ bgcolor: "#F0F2F5", minWidth: "40px", minHeight: "40px" }}>
                            <ForumIcon style={{ color: "black" }} />
                        </Avatar>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorMessageMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                // keepMounted
                open={Boolean(anchorMessageMenu)}
                onClose={toggleMenu}
                slotProps={{
                    paper: {
                        className: "header__options-drop-menu",
                    },
                }}
            >
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center">chat 1</Typography>
                </MenuItem>
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center">chat 2</Typography>
                </MenuItem>
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center">chat 3</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default HeaderMessageOptions;
