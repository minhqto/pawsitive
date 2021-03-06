import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "../components/Typography";
import ProductHeroLayout from "./BigBannerLayout";
import Button from "../components/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import TextField from "../components/TextField";

const backgroundImage = "https://i.imgur.com/KVXc7xQ.jpeg";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
  buttonRow: {
    display: "flex",
    alignItems: "center",
  },
  searchBarGrid: {
    marginTop: theme.spacing(10),
  },
  searchBarTextField: {
    width: "50%",
  },
});

const BigBanner = (props) => {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Only the best for your furry family member
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Find the right services to keep your fur friend happy! Connect with
        trainers, dog food suppliers and more!
      </Typography>
      <Grid container spacing={3} className={classes.buttonRow}>
        {/* This is a hack to get it to be in the center */}
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Link to="/search">
            <Button
              variant="contained"
              className={classes.button}
              component="a"
            >
              Find services
            </Button>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Link to="/signupSpecialist">
            <Button
              variant="contained"
              className={classes.button}
              component="a"
            >
              Be a service provider
            </Button>
          </Link>
        </Grid>
      </Grid>
      {/* <Grid container>
        <Grid item xl={12} className={classes.searchBarGrid}>
          <TextField
            className={classes.searchBarTextField}
            placeholder="Enter your city or postal code"
          />
          <Button
            variant="contained"
            className={classes.button}
            component="a"
            href="/signupSpecialist"
          >
            Find services near you!
          </Button>
        </Grid>
      </Grid> */}
    </ProductHeroLayout>
  );
};

BigBanner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BigBanner);
