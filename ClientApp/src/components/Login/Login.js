import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser, setCurrentUser } from "../../redux/auth";
import { setAuthToken } from "../../utils/auth";

// Material components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

// Custom components
import PawsitiveTheme from "../../Theme";
import RegisterModal from "../Register/RegisterModal";
import { blueGrey, lightBlue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
  },
  image: {
    backgroundImage: "url(https://i.imgur.com/lBFdmTL.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: blueGrey
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const classes = useStyles();
  const pawTheme = PawsitiveTheme;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail() && validatePassword()) {
      const reqBody = {
        email: email,
        password: password,
        rememberMe: isRemember
      };
      axios
        .post("/api/Authenticate/login", reqBody)
        .then((res) => {
          if (res.status === 200) {
            const { token } = res.data;

            // get user data from the token
            let decoded = jwt_decode(token);

            // set token to request authorization header
            setAuthToken(token);

            // update user data in global state
            dispatch(setCurrentUser(decoded));

            localStorage.setItem("jwtToken", token);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          const { message } = err.response.data;
          console.error(err);
          setServerError(message);
        });
    }
  };

  const validateEmail = () => {
    if (email === "") {
      setEmailError("Email must not be empty.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (password === "") {
      setPasswordError("Password must not be empty.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  return (
    <ThemeProvider theme={pawTheme}>
      {serverError && <Alert severity="error">{serverError}</Alert>}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} square>
          <div className={classes.paper}>
            <Avatar src="https://i.imgur.com/WHw5aeR.jpg"></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                value={email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setServerError("");
                  setEmailError("");
                  setEmail(e.target.value);
                }}
                error={emailError !== ""}
                helperText={emailError}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setServerError("");
                  setPasswordError("");
                  setPassword(e.target.value);
                }}
                error={passwordError !== ""}
                helperText={passwordError}
              />
              <FormControlLabel
                control={<Checkbox onChange={() => setIsRemember(!isRemember)} value={isRemember} color="primary" />}
                label="Remember me(deferred)"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <RegisterModal />
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
