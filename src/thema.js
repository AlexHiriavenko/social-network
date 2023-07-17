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
    textColor: "#050505",
    textColorAdditional: "#65676B",
    backgroundSection: "#ffffff",
    buttonBackground: "#E4E6EB",
    buttonBackgroundHover: "#DEDEDE",
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
    textColor: "#FFFFFF",
    textColorAdditional: "#B0B3B8",
    backgroundSection: "#242526",
    buttonBackground: "#3a3b3c",
    buttonBackgroundHover: "#5C5C5C",
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
