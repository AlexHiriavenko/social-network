import { createTheme } from "@mui/material";

export const themeDay = createTheme({
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
    palette: {
        accentColor: {
            main: "#1B74E4",
            secondary: "#E7F3FF",
        },
        textColor: {
            main: "#050505",
            secondary: "#65676B",
        },
        backgroundColor: {
            section: "#ffffff",
            page: "#F0F2F5",
            pageSeparator: "#cdcfd3",
        },
        buttonColor: {
            background: "#E4E6EB",
            backgroundHover: "#DEDEDE",
        },
        input: {
            mainBackground: "#f0f2f5",
            activeBorderColor: "#1876f2",
        },
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

export const themeNight = createTheme({
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
    palette: {
        accentColor: {
            main: "#1B74E4",
            secondary: "#E7F3FF",
        },
        textColor: {
            main: "#FFFFFF",
            secondary: "#B0B3B8",
        },
        backgroundColor: {
            section: "#242526",
            page: "#18191A",
            pageSeparator: "#393a3b",
        },
        buttonColor: {
            background: "#3a3b3c",
            backgroundHover: "#5C5C5C",
        },
        input: {
            mainBackground: "#3a3b3c",
            activeBorderColor: "#1876f2",
        },
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
