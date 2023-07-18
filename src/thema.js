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
    bgColor: {
      main: "#FFA500",
    },
    textColor: {
      main: "#A52A2A",
    },
    hoverColor: {
      main: "#800080",
    },
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
      page: "F0F2F5",
      pageSeparator: "#cdcfd3",
    },
    buttonColor: {
      background: "#E4E6EB",
      backgroundHover: "#DEDEDE",
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
    bgColor: {
      main: "#FF0000",
    },
    textColor: {
      main: "#0000FF",
    },
    hoverColor: {
      main: "#00FF00",
    },
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
