import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Segoe UI Regular",
  },
  palette: {
    light: {
      textColor: "#050505",
      textColorAdditional: "#65676B",
      backgroundSection: "#ffffff",
      buttonBackground: "#E4E6EB",
      buttonBackgroundHover: "#DEDEDE",
    },
    dark: {
      textColor: "#FFFFFF",
      textColorAdditional: "#B0B3B8",
      backgroundSection: "#242526",
      buttonBackground: "#3a3b3c",
      buttonBackgroundHover: "#5C5C5C",
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
