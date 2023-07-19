import { createTheme } from "@mui/material";

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1280,
            xl: 1920,
        },
    },
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
