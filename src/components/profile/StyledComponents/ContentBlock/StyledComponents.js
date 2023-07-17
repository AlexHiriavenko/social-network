import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";


const ProfileContainer = styled("div")({
  maxWidth: "1095px",
  marginLeft: "auto",
  marginRight: "auto",
});

const StyledProfileButton = styled(Button)(({ theme }) => ({
  color: (useSelector((state) => state.theme.mode) === "light" ? theme.palette.light : theme.palette.dark)
    .textColor,
  backgroundColor: (useSelector((state) => state.theme.mode) === "light"
    ? theme.palette.light
    : theme.palette.dark
  ).buttonBackground,
  width: "100%",
  textAlign: "center",
  fontFamily: "sans-serif",
  padding: "5px 10px",
  borderRadius: "5px",
  marginTop: "15px",
  transitionDuration: "500ms",
  display: "flex",
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "center",
  columnGap: "5px",
  fontSize: "15px",
  position: "relative",
  zIndex: 10,
  textTransform: "inherit",
  "&:hover": {
    backgroundColor: (useSelector((state) => state.theme.mode) === "light"
      ? theme.palette.light
      : theme.palette.dark
    ).buttonBackgroundHover,
  },
}));

const ContentBlock = styled("div")(({ theme }) => ({
  backgroundColor: (useSelector((state) => state.theme.mode) === "light"
    ? theme.palette.light
    : theme.palette.dark
  ).backgroundSection,
  borderRadius: 12,
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
}));

export { ContentBlock, ProfileContainer, StyledProfileButton };
