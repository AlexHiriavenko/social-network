import { styled } from "@mui/material/styles";

export const Aside = styled("aside")(({ theme, className }) => ({
    minWidth: "220px",
    width: "33%",
    maxWidth: "360px",
    boxSizing: "content-box",
    backgroundColor: theme.palette.backgroundColor.section,
    borderRight: theme.palette.border.transp,
    "@media (max-width: 700px)": {
        padding: 0,
        minWidth: "max-content",
        width: "max-content",
        maxWidth: "80px",
    },

    "@media (max-width: 480px)": {
        boxSizing: "border-box",
        minWidth: "50px",
        width: "50px",
    },
    ...className,
}));
