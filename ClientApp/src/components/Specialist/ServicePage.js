import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "reactstrap/lib/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
  rootProduct: {
    flexGrow: 1,
    width: 350,
  },
});

export const ServicePage = function (specialistData) {
  const [valueRating, setValueRating] = React.useState(3);
  const [valueProduct, setValueProduct] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValueProduct(newValue);
  };

  return (
    <div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={8} direction="column">
            <Typography variant="h5">Bread Pitt</Typography>
            <Typography variant="subtitle1">Professional Trainer</Typography>
            <Typography variant="subtitle2" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque elementum nibh semper ante euismod, sit amet
              tincidunt metus cursus. Nunc sagittis vestibulum leo, at molestie
              metus mollis nec. Donec ornare, lectus at volutpat commodo, diam
              diam lobortis felis, id facilisis orci quam a nunc. Vestibulum nec
              sollicitudin tortor, eu pretium nibh. Nulla lobortis a dui id
              fringilla. Sed sed urna sed ante accumsan egestas. Maecenas neque
              tellus, tristique ac laoreet eu, sollicitudin ac est.
            </Typography>
          </Grid>

          <Grid item xs={4} direction="row" justifyContent="flex-end">
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <div className={classes.rootProduct}>
          <AppBar position="static" color="default">
            <Tabs
              value={valueProduct}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              centered
            >
              <Tab label="Training" {...a11yProps(0)} />
              <Tab label="Pet Food" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={valueProduct} index={0}>
            {
              <div>
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
              </div>
            }
          </TabPanel>
          <TabPanel value={valueProduct} index={1}>
            Item Two
          </TabPanel>
        </div>

        <br />

        <Button variant="contained" color="primary">
          Book a Service
        </Button>
      </div>
    </div>
  );
};
