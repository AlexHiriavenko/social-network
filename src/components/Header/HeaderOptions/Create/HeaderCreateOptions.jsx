import React from "react";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem } from "@mui/material";
import { default as AddOption } from "@mui/icons-material/Add";

function HeaderCreateOptions() {
    const [anchorElCreate, setAnchorElCreate] = React.useState(null);

    const handleOpenMenu = () => {
        setAnchorElCreate(document.querySelector(".anchor-menu"));
    };

    const handleCloseMenu = () => {
        setAnchorElCreate(null);
    };

    return (
        <>
            <Tooltip
                title="Messenger"
                sx={{
                    p: { xs: "4px", sm: 1 },
                    display: {
                        lg: "none",
                        xs: "flex",
                    },
                }}
            >
                <IconButton onClick={handleOpenMenu}>
                    <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                        <AddOption style={{ color: "black" }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                autoFocus={false}
                sx={{ mt: "45px" }}
                anchorEl={anchorElCreate}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElCreate)}
                onClose={handleCloseMenu}
                slotProps={{
                    paper: {
                        className: "header__drop-menu",
                    },
                }}
            >
                <MenuItem onClick={handleCloseMenu}>
                    <Typography textAlign="center">create something 1</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                    <Typography textAlign="center">create something 2</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                    <Typography textAlign="center">create something 3</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default HeaderCreateOptions;
