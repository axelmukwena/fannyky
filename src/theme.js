import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
// A custom theme for this app
const theme = createTheme({
	palette: {
		type: "light",
		primary: {
			main: "#000",
			light: "#c7c7c7",
			dark: "#404040",
		},
		secondary: {
			main: "#fff",
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
