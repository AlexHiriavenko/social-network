import styled from "@emotion/styled";
import { Button } from "@mui/material";

const StyledProfileButton = styled(Button)(({ theme }) => ({
  color: theme.palette.textColor.main,
  backgroundColor: theme.palette.buttonColor.background,
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
    backgroundColor: theme.palette.buttonColor.backgroundHover,
  },
}));

export default function ProfilePageButton(props) {
  const { text, icon, style, className} = props;
  return <StyledProfileButton className={className} style={style}>{icon} {text}</StyledProfileButton>;
}
