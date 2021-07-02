import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./BigBannerLayout";

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
});

const BigBanner = (props) => {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Only the best for your furry bestfriend
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
      {/* <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography> */}
    </ProductHeroLayout>
  );
};

BigBanner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BigBanner);
