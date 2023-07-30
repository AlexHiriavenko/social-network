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
            onDarkFone: "#ffffff",
        },
        textColor: {
            main: "#050505",
            secondary: "#65676B",
            blueLink: '#216FDB',
            content: "#050505",
            primary: "#1B74E4",
        },
        backgroundColor: {
            section: "#ffffff",
            page: "#F0F2F5",
            pageSeparator: "#cdcfd3",
            iconFill: "#8D949E",
            activeIcon: "#1877F2",
            card: "#ffffff",
        },
        buttonColor: {
            background: "#E4E6EB",
            backgroundHover: "#DEDEDE",
            primary: '#1B74E4',
            primaryHover: '#1877F2',
            primaryPressed: '#77A7FF',
            mainLight: "#1B74E4",
        },
        input: {
            mainBackground: "#f0f2f5",
            activeBorderColor: "#1876f2",
        },
        hoverColor: {
            main: "#f0f2f5",
            secondary: "#E4E6EB",
            dark: "#E4E6EB",
        },
        shadow: {
            down: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.12), 0px 1px 6px 0px rgba(0,0,0,0.12)",
        },
        border: {
            transp: "1px solid rgba(0, 0, 0, 0.1)",
            simpleTransp: "rgba(0, 0, 0, 0.1)",
            card: '#CED0D4',
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
            secondary: "#263951",
        },
        textColor: {
            main: "#FFFFFF",
            secondary: "#B0B3B8",
            content: "#E4E6EB",
            primary: "#1B74E4",
            blueLink:'#4599FF',
        },
        backgroundColor: {
            section: "#242526",
            page: "#18191A",
            card: "#242526",
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
        hoverColor: {
            main: "#3a3b3c",
            secondary: "#3a3b3c",
            dark: "#65676B",
        },
        shadow: {
            down: "0px 2px 4px -1px rgba(255,255,255,0.2), 0px 2px 2px 0px rgba(255,255,255,0.12), 0px 1px 6px 0px rgba(255,255,255,0.12)",
        },
        border: {
            transp: "1px solid rgba(255, 255, 255, 0.1)",
            simpleTransp: "rgba(255, 255, 255, 0.1)",
            card: '#3E4042',
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
