import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import loginUser from "../store/currentUser/login";
import { AUTHORIZE } from "../utilities/constants";
import { setUserCookie } from "../utilities/cookies";
import { authorize } from "../store/currentUser/currentUserSlice";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
  },
  button: {
    width: "100%",
    height: 40,
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 800,
    fontSize: "1.2rem",
    color: "#222",
    flexGrow: 1,
    textAlign: "center",
  },
  forgotPassword: {
    marginTop: theme.spacing(2),
    fontWeight: 400,
    fontSize: "1rem",
    color: "#222",
    flexGrow: 1,
    textAlign: "center",
  },
}));

const Login = function Login() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const router = useRouter();

  // create state variables for each input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });

  const handleCancel = (e) => {
    e.preventDefault();
    router.replace("/");
  };

  function handleResponse(data) {
    if (data.success === true) {
      setUserCookie(AUTHORIZE, data.token, 7);
      dispatch(authorize(data));
      router.replace("/");
      return;
    }
    dispatch(authorize(null));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      user: {
        email,
        password: password.password,
      },
    };

    loginUser(params, handleResponse);
  };

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={6} md={3} sx={{ margin: "20px" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h3" className={classes.title}>
              Admin Login Panel
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              autoFocus
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl required fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={password.showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={password.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {password.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              className={classes.button}
              type="button"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Link href="/" className={classes.forgotPassword}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
