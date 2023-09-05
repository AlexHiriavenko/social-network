import { styled } from "@mui/material/styles";
import { List, ListItem } from "@mui/material";

export const StyledMessagesList = styled(List)(({ theme, className }) => ({
    backgroundColor: theme.palette.backgroundColor.section,
    maxWidth: "100%",
    minHeight: "50px",
    maxHeight: "80vh",
    overflowY: "auto",
    "@media (max-width: 480px)": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    ...className,
}));

export const ItemListChat = styled(ListItem)(({ theme, className }) => ({
    gap: 1,
    "&:hover": {
        backgroundColor: theme.palette.hoverColor.secondary,
    },
    "@media (max-width: 700px)": {
        justifyContent: "center",
    },
    "@media (max-width: 480px)": {
        paddingInline: 0,
        width: "100%",
        justifyContent: "center",
    },
    ...className,
}));
