import { styled } from "@mui/material/styles";
import { Avatar, Button, MenuItem, Box } from "@mui/material";

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
