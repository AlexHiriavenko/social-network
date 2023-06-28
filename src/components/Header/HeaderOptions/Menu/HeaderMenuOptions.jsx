import AppsIcon from "@mui/icons-material/Apps";
import React from "react";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem } from "@mui/material";

function HeaderMenuOptions() {
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);

    const handleOpenMenu = (setAnchor) => () => {
        setAnchor(document.querySelector(".anchor-menu"));
    };

    const handleCloseMenu = (setAnchor) => () => {
        setAnchor(null);
    };

    return (
        <>
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
                <IconButton onClick={handleOpenMenu(setAnchorElMenu)}>
                    <Avatar sx={{ bgcolor: "#F0F2F5" }}>
                        <AppsIcon style={{ color: "black" }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElMenu)}
                onClose={handleCloseMenu(setAnchorElMenu)}
                slotProps={{
                    paper: {
                        className: "header__drop-menu",
                    },
                }}
            >
                <MenuItem onClick={handleCloseMenu(setAnchorElMenu)}>
                    <Typography textAlign="center">menu 1</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu(setAnchorElMenu)}>
                    <Typography textAlign="center">menu 2</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu(setAnchorElMenu)}>
                    <Typography textAlign="center">menu 3</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default HeaderMenuOptions;
