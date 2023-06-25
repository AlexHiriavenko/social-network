import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import s from "../header.module.css";
import { Box, Tooltip } from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";

function HeaderNavigation() {
    return (
        <nav className={s.navHeader}>
            <NavLink to="/" className={s.navItemLink}>
                <Tooltip title="Home">
                    <HomeIcon fontSize="large" />
                </Tooltip>
            </NavLink>
            <NavLink to="/watch" className={s.navItemLink}>
                <Tooltip title="Watch">
                    <OndemandVideoIcon fontSize="large" />
                </Tooltip>
            </NavLink>
            <NavLink to="/marketplace" className={s.navItemLink}>
                <Tooltip title="Marketplace">
                    <StorefrontIcon fontSize="large" />
                </Tooltip>
            </NavLink>
            <NavLink to="/groups" className={s.navItemLink}>
                <Tooltip title="Groups">
                    <Groups2RoundedIcon
                        fontSize="large"
                        sx={{
                            border: "2px solid rgb(101, 103, 107)",
                            borderRadius: "50%",
                            p: "2px",
                        }}
                    />
                </Tooltip>
            </NavLink>
        </nav>
    );
}

export default HeaderNavigation;
