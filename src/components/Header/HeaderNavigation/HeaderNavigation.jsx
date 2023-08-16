import * as React from "react";
import { NavLink, useMatch } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { Tooltip, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";

const WrapLink = styled(Box)(({ theme }) => ({
    boxSizing: "content-box",
    width: "100%",
    paddingBottom: "4px",
    paddingTop: "4px",
    borderRadius: "12px",
    transitionDuration: "0.5s",
    "&:hover": { backgroundColor: theme.palette.hoverColor.main },
}));

const setActive = ({ isActive }) =>
    isActive ? "header__nav-link--active" : "header__nav-link";

function HeaderNavigation() {
    const theme = useTheme();
    const matchHome = useMatch("/");
    const matchGroups = useMatch("/groups");

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
                                color: matchGroups?.pathname
                                    ? theme.palette.textColor.primary
                                    : theme.palette.textColor.secondary,
                                border: matchGroups?.pathname
                                    ? "2px solid #1B74E4"
                                    : "2px solid rgb(101, 103, 107)",
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
