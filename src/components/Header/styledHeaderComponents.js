import { styled } from "@mui/material/styles";
import { Box, AppBar } from "@mui/material";

export const AppBarStyled = styled(AppBar)(({ theme, className }) => ({
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "65px",
    minHeight: "5%",
    /* minWidth: '360px', */
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

export const WrapLink = styled(Box)(({ theme }) => ({
    boxSizing: "content-box",
    width: "100%",
    paddingBottom: "4px",
    paddingTop: "4px",
    borderRadius: "12px",
    transitionDuration: "0.5s",
    "&:hover": { backgroundColor: theme.palette.hoverColor.main },
}));

export const ContainerDrawerBody = styled(Box)(({ theme, className }) => ({
    width: {
        xs: "320px",
        sm: "360px",
    },
    backgroundColor: theme.palette.backgroundColor.section,
    minHeight: "calc(100% - 65px)",
    ...className,
}));

export const TitleDrawerBody = styled(Box)(({ theme, className }) => ({
    flexGrow: 1,
    padding: "16px",
    fontFamily: "Segoe UI Bold",
    color: theme.palette.textColor.content,
    ...className,
}));
