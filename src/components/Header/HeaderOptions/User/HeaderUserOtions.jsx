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
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    React.useState(null);

    const handleOpenMenu = (setAnchor) => () => {
        setAnchor(document.querySelector(".anchor-menu"));
    };

    const handleCloseMenu = (setAnchor) => () => {
        setAnchor(null);
    };
    return (
        <>
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
                slotProps={{
                    paper: {
                        className: "header__drop-menu",
                    },
                }}
            >
                <Typography textAlign="center" width="100%">
                    <Link to={"/profile"} style={{ display: "flex", width: "100%" }}>
                        Profile
                    </Link>
                </Typography>
                <MenuItem onClick={handleCloseMenu(setAnchorElUser)}>
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
