import { styled } from "@mui/material/styles";
import { Typography, Box, Avatar } from "@mui/material";

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.hoverColor.dark,
    minWidth: "40px",
    minHeight: "40px",
    cursor: "pointer",
    transitionDuration: "0.5s",
    "&:hover": {
        backgroundColor: theme.palette.buttonColor.backgroundHover,
    },
}));

export const StyledChatHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 2,
    backgroundColor: theme.palette.backgroundColor.section,
    width: "100%",
    padding: "16px",
}));
