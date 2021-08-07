import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "reactstrap/lib/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid, CircularProgress, Container } from "@material-ui/core";
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
import PageNotFound from "../PageNotFound";
import FaceIcon from '@material-ui/icons/Face';
import PetsIcon from '@material-ui/icons/Pets';

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
    maxWidth: 300,
    maxHeight: 600,
  },
  specialistImg: {
    width: 200,
  },
  rootProduct: {
    flexGrow: 1,
    width: 350,
  },
  marginTop: {
    marginTop: 20,
  },
  service: {
    marginTop: 30,
  },
  appBar: {
    maxWidth: "600",
    marginTop: 40,
  },
  table: {
    maxWidth: "600",
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
        <Grid container spacing={2}>
          <Grid item xs={8} direction="column">
            <h3>
              {specialist.firstName} {specialist.lastName}
            </h3>
            <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> <b>Business Name: </b>{specialistProfile.businessName}<br />
            <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> <b>Address: </b>
            {specialist.address.streetAddress}, {specialist.address.city}, {specialist.address.province}, {specialist.address.postalCode}<br />
            <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> <b>Home Visit available? </b>
            {specialistProfile.provideHomeVisitService ? (<Typography>&nbsp;&nbsp; : Yes, within {specialistProfile.radius}km </Typography>)
              : (<Typography>&nbsp;&nbsp; : No</Typography>)}<br />
            <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> <b>About Me:</b><br />
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
            >
              {specialistProfile.aboutMe}
            </Typography>

          </Grid>

          <Grid item xs={4} direction="row" justifyContent="flex-end">
            <Card className={classes.root}>
              {specialist.imageUrl ? (
                <CardMedia
                  component="img"
                  alt="Specialist Profile"
                  width="200"
                  maxheight="250"
                  image={specialist.imageUrl}
                  title="Specialist Profile"
                />) : (
                <CardContent><FaceIcon color="disabled" style={{ fontSize: 150 }} /></CardContent>)}

              <CardContent>
                <b>&lt;Contact Me&gt;<br /></b>
                <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> <b>Phone#</b><br /> {specialist.phoneNumber}<br />
                <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> <b>Email</b><br />{specialist.email}<br />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Services offered section */}
        <Grid>
          <Container component="main" maxWidth="lg">
            {/* Navigation bar among service types */}
            <AppBar position="static" color="default" className={classes.appBar}>
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
                    {/* Service List */}
                    <TableContainer
                      component={Paper}
                    >
                      <Table aria-label="simple table" margin="0"
                        padding="0">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center"><b>Service Name</b></TableCell>
                            <TableCell align="center"><b>Fee($)</b></TableCell>
                          </TableRow>
                        </TableHead>
                        {services ? (
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
                                  <TableCell align="center">
                                    {row.price}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>) : (
                          <TableBody>
                            <TableRow>
                              <TableCell align="center">
                                This specialist doesn't provide the service list yet.
                              </TableCell>
                            </TableRow>
                          </TableBody>)}
                      </Table>
                    </TableContainer>
                  </div>
                }
              </TabPanel>
            ))}
          </Container>
        </Grid>

        {/* <Button variant="contained" color="primary">
            Book a Service
          </Button> */}

      </div >
    );
  } else {
    return <PageNotFound />;
  }
};

export default ServicePage;
