import * as React from "react";
import { NavLink, useMatch } from "react-router-dom";
import { Tooltip } from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";

const setActive = ({ isActive }) => (isActive ? "header__nav-link--active" : "header__nav-link");

function HeaderNavigation() {
    const match = useMatch("/groups");
    return (
        <nav className="header__nav">
            <NavLink to="/" className={setActive}>
                <Tooltip title="Home">
                    <HomeIcon fontSize="large" />
                </Tooltip>
            </NavLink>
            <NavLink to="/watch" className={setActive}>
                <Tooltip title="Watch">
                    <OndemandVideoIcon fontSize="large" />
                </Tooltip>
            </NavLink>
            <NavLink to="/marketplace" className={setActive}>
                <Tooltip title="Marketplace">
                    <StorefrontIcon fontSize="large" />
                </Tooltip>
            </NavLink>
            <NavLink to="/groups" className={setActive}>
                <Tooltip title="Groups">
                    <GroupsIcon
                        fontSize="large"
                        sx={{
                            border: match?.pathname
                                ? "2px solid #1B74E4"
                                : "2px solid rgb(101, 103, 107)",
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
