import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "./LandingPage/modules/components/Typography";
import ProductHeroLayout from "./LandingPage/modules/views/BigBannerLayout";
import Button from "./LandingPage/modules/components/Button";
import Grid from "@material-ui/core/Grid";

const backgroundImage = "https://i.imgur.com/K3moQEX.jpg";

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

const PageNotFound = (props) => {
  const { classes } = props;
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Ruh-roh!
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h3"
        className={classes.h5}
      >
        Are you a little lost, hooman?
      </Typography>
      <Button
        align="center"
        variant="contained"
        className={classes.button}
        component="a"
        href="/"
      >
        Back to home
      </Button>
    </ProductHeroLayout>
  );
};

PageNotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageNotFound);
