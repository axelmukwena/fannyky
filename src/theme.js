import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000",
      light: "#c7c7c7",
      dark: "#404040",
    },
    secondary: {
      main: "#0",
      light: "#61dafb",
      dark: "#fdb03c",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: "gill-sans, sans-serif",
    // fontFamily: "Titillium Web, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "#444",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "14px 10px",
          backgroundColor: "#f1f1f1",
        },
      },
    },
  },
});
export default theme;
