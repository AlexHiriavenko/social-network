import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../../redux/login.slice/login.slice";
import { IconButton, Avatar, Tooltip } from "@mui/material";
import DarkModeMenu from "./DarkModeMenu";
import UserMenu from "./UserMenu";
import { useTheme } from "@mui/material/styles";

function HeaderUserOtions() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const authorizedUser = useSelector((state) => state.user.authorizedUser);

  const handleLogOut = (event) => {
    dispatch(logOut());
  };

  const [anchorUserMenu, setAnchorUserMenu] = React.useState(null);
  const [anchorDisplayModeMenu, setAnchorDisplayModeMenu] =
    React.useState(null);

  const toggleMenu = () =>
    anchorUserMenu
      ? setAnchorUserMenu(null)
      : setAnchorUserMenu(document.querySelector(".anchor-menu"));

  const toggleDisplayModeMenu = () => {
    anchorDisplayModeMenu
      ? setAnchorDisplayModeMenu(null)
      : setAnchorDisplayModeMenu(document.querySelector(".anchor-menu")),
      setAnchorUserMenu(null);
  };

  const goPrevMenu = () => {
    setAnchorDisplayModeMenu(null);
    setAnchorUserMenu(document.querySelector(".anchor-menu"));
  };
  return (
    <>
      <Tooltip
        title="Account"
        sx={{ p: { xs: "4px", sm: 1 } }}
        className="anchor-menu"
      >
        <IconButton
          onClick={toggleMenu}
          sx={
            ({ pt: 1, pb: 1 },
            { pl: { xs: 0.5, sm: 1 }, pr: { xs: 0.5, sm: 1 } })
          }
        >
          <Avatar
            sx={{ minWidth: "40px", minHeight: "40px" }}
            alt="user icon"
            src={authorizedUser.profilePicture}
          />
        </IconButton>
      </Tooltip>
      <UserMenu
        anchor={anchorUserMenu}
        toggleMenu={toggleMenu}
        toggleDisplayModeMenu={toggleDisplayModeMenu}
        logOut={handleLogOut}
      />
      <DarkModeMenu
        anchor={anchorDisplayModeMenu}
        toggleMenu={toggleDisplayModeMenu}
        goBack={goPrevMenu}
      />
    </>
  );
}

export default HeaderUserOtions;
