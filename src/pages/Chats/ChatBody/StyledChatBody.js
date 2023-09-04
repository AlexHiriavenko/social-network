import { styled } from "@mui/material/styles";
import { Typography, Box, Avatar } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

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

export const BtnDeleteMessage = styled(DeleteOutlineIcon)(({ theme }) => ({
    color: theme.palette.textColor.primary,
    minWidth: "24px",
    minHeight: "24px",
    cursor: "pointer",
}));

export const BtnEditMessage = styled(EditIcon)(({ theme }) => ({
    color: theme.palette.textColor.primary,
    minWidth: "24px",
    minHeight: "24px",
    cursor: "pointer",
}));

export const WrapMessage = styled(Box)(({ theme, className }) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    "@media (max-width: 480px)": {},
    ...className,
}));

export const WrapBns = styled(Box)(({ theme, className }) => ({
    display: "flex",
    gap: "8px",
    "@media (max-width: 480px)": {
        flexDirection: "column",
        gap: "4px",
    },
    ...className,
}));

export const AuthUserMessage = styled(Typography)(({ theme, className }) => ({
    backgroundColor: "#1B74E4",
    color: "#ffffff",
    padding: "16px",
    minWidth: "200px",
    maxWidth: "300px",
    borderRadius: "16px",
    ...className,
}));

export const PartnerUserMessage = styled(Typography)(({ theme, className }) => ({
    backgroundColor: "lightgray",
    padding: "16px",
    minWidth: "200px",
    maxWidth: "300px",
    borderRadius: "16px",
    ...className,
}));

export const StyledLink = styled(Link)(({ theme, className }) => ({
    display: "flex",
    alignItems: "center",
    gap: 8,
    ...className,
}));
