import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const StyledModalBlock = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "500px",
  maxHeight: "80vh",
  overflowY: "scroll",
  backgroundColor: theme.palette.backgroundColor.section,
  paddingTop: "8px",
  paddingBottom: "8px",
  borderRadius: "12px",
  position: "relative",
  fontFamily: "sans-serif",
  "&::-webkit-scrollbar": {
    width: "0",
  },
}));

const StyledModalCloseButton = styled("button")(({ theme }) => ({
  minWidth: "none",
  width: "36px",
  height: "36px",
  backgroundColor: theme.palette.buttonColor.background,
  transitionDuration: "300ms",
  borderRadius: "50%",
  position: "absolute",
  top: "8px",
  right: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundColor: theme.palette.buttonColor.backgroundHover,
  },
}));
const StyledModalCloseButtonLine = styled("span")(({ theme }) => ({
  "&::before": {
    content: "''",
    display: "block",
    backgroundColor: theme.palette.textColor.secondary,
    width: "2px",
    height: "25px",
    borderRadius: "1px",
    transform: "rotate(45deg)",
    position: "relative",
    top: "12px",
  },
  "&::after": {
    content: "''",
    display: "block",
    backgroundColor: theme.palette.textColor.secondary,
    width: "2px",
    height: "25px",
    borderRadius: "1px",
    transform: "rotate(135deg)",
    position: "relative",
    bottom: "13px",
  },
}));

const StyledModalTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.main,
  fontSize: "20px",
  textAlign: "center",
  lineHeight: "150%",
  marginTop: "2px",
  fontWeight: 700,
}));
const StyledModalSeparator = styled("span")(({ theme }) => ({
  display: "block",
  width: "100%",
  height: "1px",
  backgroundColor: theme.palette.backgroundColor.pageSeparator,
  marginTop: "12px",
  marginBottom: "8px",
}));
const StyledEditedPartButton = styled("button")(({ theme }) => ({
  color: theme.palette.accentColor.main,
  fontSize: "17px",
  padding: "5px",
  borderRadius: "5px",
  lineHeight: "100%",
  transitionDuration: "300ms",
  "&:hover": {
    backgroundColor: theme.palette.accentColor.secondary,
  },
}));
export {
  StyledModalBlock,
  StyledModalCloseButton,
  StyledModalCloseButtonLine,
  StyledModalTitle,
  StyledModalSeparator,
  StyledEditedPartButton,
};
