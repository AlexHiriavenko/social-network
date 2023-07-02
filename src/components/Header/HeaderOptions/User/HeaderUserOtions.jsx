import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../../redux/login.slice/login.slice";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

function HeaderUserOtions() {
    const dispatch = useDispatch();
    const handleLogOut = (event) => {
        dispatch(logOut());
    };

    const [anchorUserMenu, setAnchorUserMenu] = React.useState(null);
    const toggleMenu = () =>
        anchorUserMenu
            ? setAnchorUserMenu(null)
            : setAnchorUserMenu(document.querySelector(".anchor-menu"));

    return (
        <>
            <Tooltip title="Account" sx={{ p: { xs: "4px", sm: 1 } }} className="anchor-menu">
                <IconButton
                    onClick={toggleMenu}
                    sx={({ pt: 1, pb: 1 }, { pl: { xs: 0.5, sm: 1 }, pr: { xs: 0.5, sm: 1 } })}
                >
                    <Avatar
                        sx={{ minWidth: "40px", minHeight: "40px" }}
                        alt="user icon"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuSWkkjE4xNHNDS8YGjdMR_j4CziOv0YT9lEfDXY_K&s"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorUserMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                // keepMounted
                open={Boolean(anchorUserMenu)}
                onClose={toggleMenu}
                slotProps={{
                    paper: {
                        className: "header__options-drop-menu",
                    },
                }}
            >
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center" width="100%">
                        <Link to={"/profile"} style={{ display: "flex", width: "100%" }}>
                            Profile
                        </Link>
                    </Typography>
                </MenuItem>
                <MenuItem onClick={toggleMenu}>
                    <Typography textAlign="center" width="100%">
                        item2
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center" width="100%">
                        LogOut
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default HeaderUserOtions;
