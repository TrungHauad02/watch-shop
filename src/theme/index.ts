import { createTheme } from "@mui/material";

const theme = (isDarkMode: boolean) =>
  createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      h1: {
        fontFamily: "'Cormorant Garamond', serif",
      },
      h2: {
        fontFamily: "'Cormorant Garamond', serif",
      },
      h3: {
        fontFamily: "'Cormorant Garamond', serif",
      },
      h4: {
        fontFamily: "'Cormorant Garamond', serif",
      },
      h5: {
        fontFamily: "'Cormorant Garamond', serif",
      },
      h6: {
        fontFamily: "'Cormorant Garamond', serif",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontFamily: "'Inter', sans-serif",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "'Inter', sans-serif",
          },
        },
      },
    },
  });

export default theme;
