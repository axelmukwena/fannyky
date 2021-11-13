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
    // fontFamily: 'gill-sans, sans-serif',
    fontFamily: "Titillium Web, sans-serif",
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
      root: {
        padding: "20px 10px",
        margin: "10px",
        backgroundColor: "#fff", // 5d737e
      },
    },
    MuiButton: {
      root: {
        margin: "5px",
        textTransform: "none",
        fontSize: "0.975rem",
      },
    },
  },
});
export default theme;
