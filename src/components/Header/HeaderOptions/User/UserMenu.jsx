import React from "react";
import { Link } from "react-router-dom";
import { Typography, Menu, Avatar, MenuItem } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthorizedUser,
  setUser,
} from "../../../../redux/user.slice/user.slice";

function UserMenu(props) {
  const theme = useTheme();
  const { anchor, toggleMenu, toggleDisplayModeMenu, logOut } = props;

  const dispatch = useDispatch();
  let authorizedUser = useSelector((state) => state.user.authorizedUser);
  if(authorizedUser == null){
    dispatch(setAuthorizedUser(JSON.parse(localStorage.getItem("authorizedUser"))))
    authorizedUser = JSON.parse(localStorage.getItem("authorizedUser")) ;
  }
  function showAuthorizedUser() {
    dispatch(setUser(authorizedUser));
    localStorage.setItem("user", JSON.stringify(authorizedUser))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Menu
      sx={{ mt: "45px" }}
      anchorEl={anchor}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      // keepMounted
      open={Boolean(anchor)}
      onClose={toggleMenu}
      slotProps={{
        paper: {
          className: "header__options-drop-menu",
          style: { backgroundColor: theme.palette.backgroundColor.section },
        },
      }}
    >
      <MenuItem
        onClick={toggleMenu}
        sx={{ "&:hover": { backgroundColor: theme.palette.hoverColor.main } }}
      >
        <Link
          className="header__menu-item-link"
          to={"/profile"}
          onClick={showAuthorizedUser}
        >
          <Avatar
            sx={{ minWidth: "40px", minHeight: "40px" }}
            alt="user icon"
            src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
          />
          <Typography
            fontWeight={700}
            sx={{ color: theme.palette.textColor.content }}
          >
            My Profile
          </Typography>
        </Link>
      </MenuItem>
      <MenuItem
        onClick={toggleDisplayModeMenu}
        className="header__menu-item"
        sx={{
          mt: "10px",
          "&:hover": { backgroundColor: theme.palette.hoverColor.main },
        }}
      >
        <NightsStayIcon className="header__menu-item-icon" />
        <Typography
          fontWeight={700}
          sx={{ color: theme.palette.textColor.content }}
        >
          Display Mode
        </Typography>
        <ArrowForwardIosIcon sx={{ ml: "auto", color: "rgb(101, 103, 107)" }} />
      </MenuItem>
      <MenuItem
        onClick={logOut}
        className="header__menu-item"
        sx={{
          mt: "10px",
          "&:hover": { backgroundColor: theme.palette.hoverColor.main },
        }}
      >
        <ExitToAppIcon className="header__menu-item-icon" />
        <Typography
          fontWeight={700}
          sx={{ color: theme.palette.textColor.content }}
        >
          Log Out
        </Typography>
      </MenuItem>
    </Menu>
  );
}

export default UserMenu;
