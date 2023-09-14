import { styled } from "@mui/material/styles";
import { TextField, Box, IconButton, Typography } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "300px",
    maxWidth: "98%",
    backgroundColor: theme.palette.backgroundColor.hover,
    borderRadius: "12px",
    boxShadow: theme.palette.shadow.down,
    marginBottom: "8px",
    "& label": {
        color: theme.palette.textColor.secondary,
    },
    "& label.Mui-focused": {
        color: theme.palette.textColor.secondary,
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.textColor.secondary,
            borderRadius: "12px",
        },
        "&:hover fieldset": {
            borderColor: theme.palette.textColor.primary,
        },
        "&.Mui-focused fieldset": {
            borderColor: "primary",
        },
        "& input": {
            color: theme.palette.textColor.main, // Применяем цвет текста внутри инпута
        },
        "& textarea": {
            color: theme.palette.textColor.main,
        },
    },
}));

export const StyledMessageBtnGroup = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "16px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    "@media (max-width: 480px)": {
        flexDirection: "row",
        justifyContent: "end",
        alignItems: "start",
        gap: "4px",
    },
}));

export const Container = styled("div")(({ theme, className }) => ({
    backgroundColor: theme.palette.backgroundColor.card,
    height: "calc(100% - 65px)",
    overflow: "hidden",
    ...className,
}));

export const ContainerFlex = styled("div")(({ theme, className }) => ({
    display: "flex",
    backgroundColor: theme.palette.backgroundColor.card,
    height: "calc(100% - 65px)",
    width: "100%",
    maxWidth: "1920px",
    minHeight: "calc(100vh - 65px)",
    marginLeft: "auto",
    marginRight: "auto",
    ...className,
}));

export const EmptyChatPage = styled("div")(({ theme, className }) => ({
    alignSelf: "center",
    paddingBottom: "65px",
    fontSize: "22px",
    fontWeight: 700,
    margin: "18px auto 0",
    textAlign: "center",
    color: theme.palette.textColor.secondary,
    ...className,
}));

export const ChatContainer = styled(Box)(({ theme, className }) => ({
    paddingInline: "16px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    ...className,
}));

export const BtnNewChat = styled(IconButton)(({ theme, className }) => ({
    minWidth: "50px",
    "&:hover": {
        backgroundColor: theme.palette.hoverColor.main,
    },
    ...className,
}));

export const ChatTitle = styled(Typography)(({ theme, className }) => ({
    "@media (max-width: 480px)": {
        display: "none",
    },
    ...className,
}));

export const WrapSidebar = styled("div")(({ theme, className }) => ({
    display: "flex",
    alignItems: "center",
    gap: "16px",
    justifyContent: "space-between",
    paddingInline: "16px",
    paddingTop: "8px",
    "@media (max-width: 480px)": {
        paddingInline: 0,
    },
    ...className,
}));
