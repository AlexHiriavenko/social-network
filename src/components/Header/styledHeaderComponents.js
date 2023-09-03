import { styled } from "@mui/material/styles";
import { Avatar, Button, MenuItem, Box, Typography, AppBar } from "@mui/material";

export const AppBarStyled = styled(AppBar)(({ theme, className }) => ({
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "65px",
    minHeight: "5%",
    backgroundColor: theme.palette.backgroundColor.section,
    boxShadow: theme.palette.shadow.down,
    ...className,
}));

export const FlexCenter = styled(Box)(({ theme, className }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...className,
}));
