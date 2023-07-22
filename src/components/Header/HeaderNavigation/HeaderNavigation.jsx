import * as React from "react";
import { NavLink, useMatch } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";

const setActive = ({ isActive }) => (isActive ? "header__nav-link--active" : "header__nav-link");

function HeaderNavigation() {
    const theme = useTheme();
    const matchHome = useMatch("/");
    const matchWatch = useMatch("/watch");
    const matchMarket = useMatch("/marketplace");
    const matchGroups = useMatch("/groups");

    return (
        <nav className="header__nav">
            <NavLink to="/" className={setActive}>
                <Tooltip title="Home">
                    <HomeIcon
                        fontSize="large"
                        sx={{
                            color: matchHome?.pathname
                                ? theme.palette.textColor.primary
                                : theme.palette.textColor.secondary,
                        }}
                    />
                </Tooltip>
            </NavLink>
            <NavLink to="/watch" className={setActive}>
                <Tooltip title="Watch">
                    <OndemandVideoIcon
                        fontSize="large"
                        sx={{
                            color: matchWatch?.pathname
                                ? theme.palette.textColor.primary
                                : theme.palette.textColor.secondary,
                        }}
                    />
                </Tooltip>
            </NavLink>
            <NavLink to="/marketplace" className={setActive}>
                <Tooltip title="Marketplace">
                    <StorefrontIcon
                        fontSize="large"
                        sx={{
                            color: matchMarket?.pathname
                                ? theme.palette.textColor.primary
                                : theme.palette.textColor.secondary,
                        }}
                    />
                </Tooltip>
            </NavLink>
            <NavLink to="/groups" className={setActive}>
                <Tooltip title="Groups">
                    <GroupsIcon
                        fontSize="large"
                        sx={{
                            color: matchGroups?.pathname
                                ? theme.palette.textColor.primary
                                : theme.palette.textColor.secondary,
                            border: matchGroups?.pathname
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
