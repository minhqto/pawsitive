import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import PawsitiveTheme from "../../Theme";
import DistanceSlider from "../DistanceSlider";
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
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar src="https://i.imgur.com/WHw5aeR.jpg"></Avatar>
          <Typography component="h1" variant="h5">
            Register as Specialist
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5}>
                <DistanceSlider />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="businessAddress"
                  label="Business Address (optional)"
                  name="businessAddress"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={6}>
                <FormLabel component="legend">Services you offer</FormLabel>
                <FormControlLabel
                  control={<Checkbox name="training" color="primary" />}
                  label="Dog Training"
                />
                <FormControlLabel
                  control={<Checkbox name="grooming" color="primary" />}
                  label="Dog Grooming"
                />
                <FormControlLabel
                  control={<Checkbox name="food" color="primary" />}
                  label="Pet Food"
                />
                <FormControlLabel
                  control={<Checkbox name="therapy" color="primary" />}
                  label="Behavioural Therapy"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="streetAddress"
                  label="Street Address"
                  id="streetAddress"
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5}>
                <TextField
                  multiline
                  rows={6}
                  variant="outlined"
                  required
                  fullWidth
                  name="about"
                  label="About me"
                  id="about"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="postalCode"
                  label="Postal Code"
                  id="postalCode"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterSpecialist;
