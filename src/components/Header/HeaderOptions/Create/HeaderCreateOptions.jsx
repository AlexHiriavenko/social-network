import React from "react";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem } from "@mui/material";
import { default as AddOption } from "@mui/icons-material/Add";

function HeaderCreateOptions() {
    const [anchorCreateMenu, setAnchorCreateMenu] = React.useState(null);

    const toggleMenu = () =>
        anchorCreateMenu
            ? setAnchorCreateMenu(null)
            : setAnchorCreateMenu(document.querySelector(".anchor-menu"));

    return (
        <>
            <Tooltip title="Create" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={toggleMenu}>
                    <Avatar
                        sx={{
                            bgcolor: "#F0F2F5",
                            minWidth: "40px",
                            minHeight: "40px",
                        }}
                    >
                        <AddOption style={{ color: "black" }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                autoFocus={false}
                sx={{ mt: "45px" }}
                anchorEl={anchorCreateMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                // keepMounted
                open={Boolean(anchorCreateMenu)}
                onClose={toggleMenu}
                slotProps={{
                    paper: {
                        className: "header__options-drop-menu",
                    },
                }}
            >
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center">create something 1</Typography>
                </MenuItem>
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center">create something 2</Typography>
                </MenuItem>
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center">create something 3</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default HeaderCreateOptions;
