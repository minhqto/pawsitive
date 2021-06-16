import React, { useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
//import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import PawsitiveTheme from "../../Theme";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
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
  },
}));

const RegisterClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const classes = useStyles();
  const pawTheme = PawsitiveTheme;
  const history = useHistory();

  const handleRegisterOnClick = (event) => {
    event.preventDefault();
    console.log("Button Clicked");
    if (validateEmail() && validatePassword() && validateConfirmPassword()) {
      console.log("Request is going..");
      const reqBody = {
        email: email,
        password: password,
      };
      axios
        .post("/api/Authenticate/register-client", reqBody)
        .then((res) => {
          if (res.status === 200) {
            // Need to prompt pop-up "Thank you for Sign-up! Please sign-in"
            alert("Thank you for Sign-up! Please sign-in");
            history.push("/login");
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

  //TODO - checking if the email already exists in a real time
  const validateEmail = () => {
    if (email === "") {
      setEmailError("Email is required.");
      return false;
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      setEmailError("Email is invalid.");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    console.log("Password validating");
    if (password === "") {
      setPasswordError("Password is required");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword === "") {
      setConfirmPasswordError("Confirmation Password is required");
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(
        "The password and confirmation password do not match."
      );
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  const handleLogInOnClick = (event) => {
    event.preventDefault();
    history.push("/login");
  };

  return (
    <ThemeProvider theme={pawTheme}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} square>
          <div className={classes.paper}>
            <Avatar src="https://i.imgur.com/WHw5aeR.jpg"></Avatar>
            <Typography component="h1" variant="h5">
              Register as Client
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleRegisterOnClick}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoFocus
                value={email}
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
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setServerError("");
                  setPasswordError("");
                  setPassword(e.target.value);
                }}
                error={passwordError !== ""}
                helperText={passwordError}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password2"
                name="password2"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setServerError("");
                  setConfirmPasswordError("");
                  setConfirmPassword(e.target.value);
                }}
                error={confirmPasswordError !== ""}
                helperText={confirmPasswordError}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
            <Link
              href="#"
              variant="body2"
              onClick={(event) => {
                handleLogInOnClick(event);
              }}
            >
              {"Already have an account? Log in"}
            </Link>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RegisterClient;
