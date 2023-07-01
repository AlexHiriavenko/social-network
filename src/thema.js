import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32 + "px",
          height: 32 + "px",
        },
      },
    },
  },
});
