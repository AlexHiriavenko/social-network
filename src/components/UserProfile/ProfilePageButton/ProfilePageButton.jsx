import styled from "@emotion/styled";
import { Button } from "@mui/material";

const StyledProfileButton = styled(Button)(({ theme }) => ({
  color: theme.palette.textColor.main,
  backgroundColor: theme.palette.buttonColor.background,
  textAlign: "center",
  fontFamily: "sans-serif",
  fontWeight: 600,
  padding: "5px 10px",
  borderRadius: "5px",
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
  const { text, icon, style, className, clickAction } = props;
  return (
    <StyledProfileButton
      className={className}
      style={style}
      onClick={clickAction}
    >
      {icon} {text}
    </StyledProfileButton>
  );
}

ProfilePageButton.defaultProps = {
  icon: null,
  text: "",
  clickAction: () => {},
};
