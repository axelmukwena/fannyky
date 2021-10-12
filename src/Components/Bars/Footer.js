import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	topBar: {
        top: 'auto',
        bottom: 0,
	},
	title: {
		marginLeft: theme.spacing(2),
		marginTop: theme.spacing(2),
	},
	typography: {
		fontWeight: 500,
		fontSize: "1.2rem",
		color: "#444",
	},
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<AppBar elevation={0} sx={{ top: 'auto', bottom: 0 }}>
			<Toolbar>
				Footer
			</Toolbar>
		</AppBar>
	);
};

export default Footer;
