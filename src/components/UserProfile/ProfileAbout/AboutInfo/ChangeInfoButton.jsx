import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import { Button, List, ListItem } from "@mui/material";

const ProfileAboutChangeBtn = styled(Button)(({ theme }) => ({
  minWidth: "36px",
  minHeight: "36px",
  borderRadius: "50%",
  backgroundColor: theme.palette.buttonColor.background,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "2px",
}));
const ProfileAboutChangeBtnDot = styled("span")(({ theme }) => ({
  width: "6px",
  height: "6px",
  backgroundColor: theme.palette.textColor.main,
  borderRadius: "50%",
  display: "inline-block",
}));
const ProfileAboutChangeMenu = styled(List)(({ theme }) => ({
  position: "absolute",
  backgroundColor: theme.palette.backgroundColor.section,
  top: "50px",
  right: "0",
  boxShadow: `0px 0px 20px 0px #7a7a7a`,
  borderRadius: "7px",
  paddingTop: "10px",
  paddingLeft: "5px",
  paddingBottom: "10px",
  paddingRight: "5px",
  zIndex: 99,
}));
const ProfileAboutChangeMenuItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  columnGap: "15px",
  fontSize: "15px",
  color: theme.palette.textColor.main,
  padding: "5px",
  borderRadius: "5px",
  paddingRight: "20px",
  width: "100%",
  cursor: "pointer",
  fontFamily: "sans-serif",
  transitionDuration: "300ms",
  "&:hover": {
    backgroundColor: theme.palette.buttonColor.backgroundHover,
  },
}));

export default function ChangenInfoButton({ infoName, edit, remove }) {
  const [changeMenuState, setChangeMenuState] = useState(false);
  return (
    <>
      <ProfileAboutChangeBtn
        onClick={() => setChangeMenuState(!changeMenuState)}
      >
        <ProfileAboutChangeBtnDot></ProfileAboutChangeBtnDot>
        <ProfileAboutChangeBtnDot></ProfileAboutChangeBtnDot>
        <ProfileAboutChangeBtnDot></ProfileAboutChangeBtnDot>
      </ProfileAboutChangeBtn>
      <ProfileAboutChangeMenu
        style={{ display: !changeMenuState ? "none" : "block" }}
      >
        <ProfileAboutChangeMenuItem onClick={edit}>
          <EditIcon /> Edit {infoName}
        </ProfileAboutChangeMenuItem>
        <ProfileAboutChangeMenuItem onClick={remove}>
          <DeleteIcon /> Delete {infoName}
        </ProfileAboutChangeMenuItem>
      </ProfileAboutChangeMenu>
    </>
  );
}
