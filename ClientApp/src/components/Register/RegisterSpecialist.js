import React from "react";
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
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import PawsitiveTheme from "../../Theme";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: "url(https://i.imgur.com/PUSQ6f7.png)",
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

const RegisterSpecialist = () => {
  const classes = useStyles();
  const pawTheme = PawsitiveTheme;
  const history = useHistory();

  const handleLogInOnClick = (event) => {
    event.preventDefault();
    history.push("/login");
  };

  return (
    <ThemeProvider theme={pawTheme}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} square>
          <div className={classes.paper}>
            <Avatar src="https://i.imgur.com/WHw5aeR.jpg"></Avatar>
            <Typography component="h1" variant="h5">
              Register as a Specialist
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
            <Link
              href="#"
              variant="body2"
              onClick={(event) => {
                handleLogInOnClick(event);
              }}
            >
              {"Already have an account? Log in"}{" "}
            </Link>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RegisterSpecialist;
