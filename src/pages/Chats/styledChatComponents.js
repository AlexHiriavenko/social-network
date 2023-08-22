import { styled } from "@mui/material/styles";
import { TextField, Box } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "300px",
    maxWidth: "98%",
    backgroundColor: theme.palette.backgroundColor.hover,
    borderRadius: "12px",
    boxShadow: theme.palette.shadow.down,
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
