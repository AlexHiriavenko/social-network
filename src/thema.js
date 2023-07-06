import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: "Segoe UI Regular",
    },
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: 32 + "px",
                    height: 32 + "px",
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: "14px",
                },
            },
        },
    },
});
