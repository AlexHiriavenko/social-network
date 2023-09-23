import * as React from "react";
import { NavLink, useMatch, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import { WrapLink } from "../styledHeaderComponents";

const setActive = ({ isActive }) => (isActive ? "header__nav-link--active" : "header__nav-link");

function HeaderNavigation() {
    const theme = useTheme();
    const location = useLocation();
    const matchHome = useMatch("/");
    const matchFriends = location.pathname.includes("friends");

    return (
        <nav className="header__nav">
            <NavLink to="/" className={setActive}>
                <WrapLink>
                    <Tooltip title="Home">
                        <HomeIcon
                            sx={{
                                fontSize: "38px",
                                color: matchHome?.pathname
                                    ? theme.palette.textColor.primary
                                    : theme.palette.textColor.secondary,
                            }}
                        />
                    </Tooltip>
                </WrapLink>
            </NavLink>
            <NavLink to="/friends/home" className={setActive}>
                <WrapLink>
                    <Tooltip title="Friends">
                        <GroupsIcon
                            sx={{
                                fontSize: "34px",
                                color: matchFriends
                                    ? theme.palette.textColor.primary
                                    : theme.palette.textColor.secondary,
                                border: matchFriends
                                    ? `2px solid ${theme.palette.textColor.primary}`
                                    : `2px solid ${theme.palette.textColor.secondary}`,
                                borderRadius: "50%",
                                mt: 0.5,
                            }}
                        />
                    </Tooltip>
                </WrapLink>
            </NavLink>
        </nav>
    );
}

export default HeaderNavigation;
