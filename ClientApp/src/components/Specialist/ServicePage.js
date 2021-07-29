import React, { useState, useEffect } from "react";
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  marginTop: {
    marginTop: 20,
  },
});

//Logic for Training List
function createDataTraining(name, fee) {
  return { name, fee };
}
const rowsTraining = [
  createDataTraining("Behaviour Training 1 day(Big dogs)", 70),
  createDataTraining("Behaviour Training 1 day(Small dogs)", 50),
  createDataTraining("3 Days Packages", 130),
  createDataTraining("5 Days Packages", 180),
];

//Logic for Pet Food List
function createDataFood(name, fee) {
  return { name, fee };
}
const rowsFood = [
  createDataFood("Hill's Science Diet Adult (15.87Kg)", 50),
  createDataFood("Rotal Canin Large Adult (13.6Kg)", 94.99),
];

const ServicePage = (specialistData) => {
  const [valueProduct, setValueProduct] = useState(0);
  const [specialistProfile, setSpecialistProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  const { specialistId } = useParams();
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValueProduct(newValue);
  };

  useEffect(() => {
    axios
      .get(`/api/Specialist/specialistDetail/${specialistId}`)
      .then((res) => {
        setSpecialistProfile(res.data.specialistProfile);
        setServices(res.data.specialistProfile.services);
        setServiceTypes(res.data.specialistProfile.serviceTypes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (specialistProfile != null) {
    const { specialist } = specialistProfile;
    return (
      <div>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={8} direction="column">
              <Typography variant="h5">
                {specialist.firstName} {specialist.lastName}
              </Typography>
              <Typography variant="subtitle1">
                {specialistProfile.businessName}
              </Typography>
              <Typography variant="subtitle2" paragraph>
                {specialist.email}
                <br></br>
                {specialist.address.streetAddress}
                <br></br>
                {specialist.address.city}
                <br></br>
                {specialist.phoneNumber}
              </Typography>
            </Grid>

            <Grid item xs={4} direction="row" justifyContent="flex-end">
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={specialist.imageUrl}
                  title="Specialist Profile"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {specialistProfile.aboutMe}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Services offered section */}
          <div className={classes.rootProduct}>
            {/* Navigation bar among service types */}
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
                {serviceTypes.map((serviceType, index) => (
                  <Tab
                    key={index}
                    label={serviceType.serviceTypeName}
                    {...a11yProps(0)}
                  />
                ))}
              </Tabs>
            </AppBar>
            {serviceTypes.map((serviceType, index) => (
              <TabPanel value={valueProduct} index={index}>
                {
                  <div>
                    {/* Training List */}
                    <div className={classes.marginTop}>
                      <TableContainer
                        component={Paper}
                        className={classes.marginTop}
                      >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Service Name</TableCell>
                              <TableCell align="right">Fee</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {services
                              .filter(
                                (service) =>
                                  service.serviceType.serviceTypeName ==
                                  serviceType.serviceTypeName
                              )
                              .map((row, index) => (
                                <TableRow
                                  key={index}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.serviceName}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.price}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                }
              </TabPanel>
            ))}
          </div>

          <br />

          {/* <Button variant="contained" color="primary">
            Book a Service
          </Button> */}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ServicePage;
