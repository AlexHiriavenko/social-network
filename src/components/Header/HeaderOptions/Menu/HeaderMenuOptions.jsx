import AppsIcon from "@mui/icons-material/Apps";
import React from "react";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem } from "@mui/material";

function HeaderMenuOptions() {
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);

    const toggleMenu = () =>
        anchorElMenu
            ? setAnchorElMenu(null)
            : setAnchorElMenu(document.querySelector(".anchor-menu"));

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
                <IconButton onClick={toggleMenu}>
                    <Avatar sx={{ bgcolor: "#F0F2F5", minWidth: "40px", minHeight: "40px" }}>
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
                // keepMounted
                open={Boolean(anchorElMenu)}
                onClose={toggleMenu}
                slotProps={{
                    paper: {
                        className: "header__options-drop-menu",
                    },
                }}
            >
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center">menu 1</Typography>
                </MenuItem>
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center">menu 2</Typography>
                </MenuItem>
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center">menu 3</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default HeaderMenuOptions;
