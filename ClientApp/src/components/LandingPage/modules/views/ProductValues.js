import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: "#acd8fa",
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://i.imgur.com/26BsbAJ.png"
                alt="training"
              />
              <Typography variant="h6" className={classes.title}>
                Specialized Training
              </Typography>
              <Typography variant="h5">
                {"Every pet learns differently. Optimize their training by "}
                {
                  "finding the trainer that best fits your pet, not the other way around"
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://i.imgur.com/pEtOYVB.png"
                alt="heart"
              />
              <Typography variant="h6" className={classes.title}>
                More intimate relationships
              </Typography>
              <Typography variant="h5">
                {"Pawsitive connects pet owners with small businesses "}
                {
                  "that care about your pet. No more overcrowded, generic pet stores that offer mediocre services"
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://i.imgur.com/hOqE2jm.png"
                alt="food"
              />
              <Typography variant="h6" className={classes.title}>
                Hungry?
              </Typography>
              <Typography variant="h5">
                {"Pet food that suits the unique tastes and "}
                {"picky requirements for your furry friend"}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
