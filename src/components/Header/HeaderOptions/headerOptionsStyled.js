import { styled } from "@mui/material/styles";
import { Avatar, Button, MenuItem, Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export const AvatarStyled = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.hoverColor.dark,
    minWidth: "40px",
    minHeight: "40px",
    cursor: "pointer",
    transitionDuration: "0.5s",
}));

export const BtnNotifyStyled = styled(Button)(({ theme }) => ({
    color: "inherit",
    width: "80px",
    padding: "4px",
    borderRadius: "12px",
    backgroundColor: "rgb(240, 242, 245)",
    textTransform: "capitalize",
    "&:hover": { backgroundColor: "rgb(215, 220, 220)" },
}));

export const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
    display: "flex",
    gap: "8px",
    whiteSpace: "normal",
    marginBottom: "8px",
    "&:hover": { backgroundColor: theme.palette.hoverColor.main },
}));

export const UserMenuItemStyled = styled(MenuItem)(({ theme }) => ({
    gap: "16px",
    alignItems: "center",
    marginTop: "8px",
    "&:hover": {
        backgroundColor: theme.palette.hoverColor.main,
    },
}));

export const ContainerFlexSB = styled(Box)(({ theme, className }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: "16px",
    ...className,
}));

export const StyledLink = styled(Link)(({ theme, className }) => ({
    display: "flex",
    gap: "16px",
    width: "100%",
    alignItems: "center",
    ...className,
}));

export const LastMessageContent = styled(Typography)(({ theme, className }) => ({
    color: theme.palette.textColor.content,
    width: "100%",
    maxWidth: "120px",
    fontSize: "12px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    ...className,
}));

export const BtnCreate = styled(IconButton)(({ theme }) => ({
    backgroundColor: "rgb(230, 228, 228)",
    "&:hover": {
        backgroundColor: "rgb(230, 228, 228)",
    },
}));
