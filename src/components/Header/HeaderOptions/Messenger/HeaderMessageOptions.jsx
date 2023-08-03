import React, { useState } from "react";
import {
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
  Box,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { mockInfo } from "../../HeaderSearch/SeacrhComponents/mockData";
import Chat from "./Chat";
import { openChat } from "../../../../redux/chat.slice/chat.slice";
import { useDispatch } from "react-redux";
function HeaderMessageOptions() {
  const dispatch = useDispatch();
  const [anchorMessageMenu, setAnchorMessageMenu] = React.useState(null);
  const [user, setUser] = useState([]);
  const handlerChat = (id) => {
    const user = mockInfo.find((users) => users.userID === id);
    dispatch(openChat());
    setUser(user);
    toggleMenu();
  };
  const toggleMenu = () =>
    anchorMessageMenu
      ? setAnchorMessageMenu(null)
      : setAnchorMessageMenu(document.querySelector(".anchor-menu"));

  return (
    <>
      <Tooltip title="Messenger" sx={{ p: { xs: "4px", sm: 1 } }}>
        <IconButton
          onClick={toggleMenu}
          sx={
            ({ pt: 1, pb: 1 },
            { pl: { xs: 0.5, sm: 1 }, pr: { xs: 0.5, sm: 1 } })
          }>
          <Badge badgeContent={4} color="secondary">
            <Avatar
              sx={{
                bgcolor: "#F0F2F5",
                minWidth: "40px",
                minHeight: "40px",
              }}>
              <ForumIcon style={{ color: "black" }} />
            </Avatar>
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorMessageMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // keepMounted
        open={Boolean(anchorMessageMenu)}
        onClose={toggleMenu}
        slotProps={{
          paper: {
            className: "header__options-drop-menu",
          },
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}>
          <Typography variant="h5" component={"h4"} fontWeight={600}>
            Chats
          </Typography>
          <Box>
            <Tooltip title="See all in Messenger">
              <IconButton>
                <ZoomOutMapIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="New Message" sx={{ ml: 0.5 }}>
              <IconButton>
                <EditNoteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {mockInfo.map((user) => {
          return (
            <MenuItem
              key={user.userID}
              onClick={() => handlerChat(user.userID)}
              sx={{
                display: "flex",
                gap: 1,
                whiteSpace: "normal",
                mb: 1,
              }}>
              <Avatar
                sx={{ minWidth: "40px", minHeight: "40px" }}
                alt="user icon"
                src={user.userPhoto}></Avatar>
              <Box>
                <Typography fontSize={15} fontWeight={600}>
                  {user.userName}
                </Typography>
                <Typography fontSize={14} noWrap>
                  {user.message}
                </Typography>
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
      <Chat user={user} />
    </>
  );
}

export default HeaderMessageOptions;
