import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "reactstrap/lib/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Container } from "@material-ui/core";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import EditIcon from "@material-ui/icons/Edit";
import FaceIcon from "@material-ui/icons/Face";
import PetsIcon from "@material-ui/icons/Pets";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import axios from "axios";
import EditSpecialistProfileModal from "./EditSpecialistProfileModal";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    maxHeight: 800,
  },
  media: {
    height: 250,
  },
  rootProduct: {
    flexGrow: 1,
    width: 350,
    marginTop: 30,
  },
  button: {
    height: 15,
    textAlign: "center",
    lineHeight: 0,
  },
  service: {
    marginTop: 30,
  },
  appBar: {
    maxWidth: "600",
    marginTop: 20,
  },
  table: {
    maxWidth: "600",
  },
  imgContainer: {
    margin: "20px",
    marginBotton: "20px",
    marginRight: "20px",
    marginLeft: "20px",
    fontSize: "1.2em",
    alignItems: "center",
    textAlign: "center",
  },
  specialistImg: {
    maxHeight: "300px",
    maxWidth: "200px",
  },
  specialistName: {
    margin: "20px",
    fontSize: "1.25em",
    fontWeight: "500",
  },
  specialistProfile: {
    margin: "20px",
    fontSize: "1.2em",
  },
});

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

//Logic for My Service List
function createDataService(name, fee) {
  return { name, fee };
}

export const ProfilePage = function (specialistData) {
  const [valueProduct, setValueProduct] = useState(0);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [specialistProfile, setSpecialistProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [openEditSpecialistModal, setOpenEditSpecialistModal] = useState(false);

  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValueProduct(newValue);
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`/api/Specialist/specialistDetail/${user.id}`)
        .then((res) => {
          setSpecialistProfile(res.data.specialistProfile);
          setServices(res.data.specialistProfile.services);
          setServiceTypes(res.data.specialistProfile.serviceTypes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  if (specialistProfile != null) {
    const { specialist } = specialistProfile;
    return (
      <Container>
        <div>
          <Modal
            open={openEditSpecialistModal}
            onClose={() => setOpenEditSpecialistModal(false)}
          >
            <EditSpecialistProfileModal
              cancelClick={() => setOpenEditSpecialistModal(false)}
              specialistInfo={{
                firstName: specialist.firstName,
                lastName: specialist.lastName,
                businessName: specialistProfile.businessName,
                phoneNumber: specialist.phoneNumber,
                email: specialist.email,
                imageUrl: specialist.imageUrl,
                city: specialist.address.city,
                streetAddress: specialist.address.streetAddress,
                province: specialist.address.province,
                postalCode: specialist.address.postalCode,
                aboutMe: specialistProfile.aboutMe,
                provideHomeVisitService: specialist.provideHomeVisitService,
                radius: specialist.radius,
              }}
              specialistId={user.id}
            />
          </Modal>
          <Grid mb={1}>
            <h3>My Profile</h3>
          </Grid>
          <Box
            marginTop="20px"
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
          >
            {/* Specialist Info */}
            <div className={classes.imgContainer}>
              {specialist.imageUrl ? (
                <img
                  className={classes.specialistImg}
                  src={specialist.imageUrl}
                  alt="Specialist Image"
                />
              ) : (
                <FaceIcon color="disabled" style={{ fontSize: 150 }} />
              )}

              <br />
              <Grid alignItems="center">
                <PetsIcon
                  color="action"
                  style={{ fontSize: 15, color: "#89CFF0" }}
                />{" "}
                <b>Phone#</b>
                <br /> {specialist.phoneNumber}
                <br />
                <PetsIcon
                  color="action"
                  style={{ fontSize: 15, color: "#89CFF0" }}
                />{" "}
                <b>Email</b>
                <br />
                {specialist.email}
                <br />
              </Grid>
            </div>
            <Grid
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <div className={classes.specialistName} alignItems="center">
                <h3>
                  {`${specialist.firstName} ${specialist.lastName}`}&nbsp;
                  {
                    <IconButton
                      className={classes.editButton}
                      size="small"
                      onClick={() => setOpenEditSpecialistModal(true)}
                    >
                      <EditIcon />
                    </IconButton>
                  }
                </h3>
              </div>
              <div className={classes.specialistProfile}>

                <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> <b>Business Name: </b>{specialistProfile.businessName}<br />
                <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> <b>Address: </b>
                {specialist.address.streetAddress}, {specialist.address.city}, {specialist.address.province}, {specialist.address.postalCode}<br />
                <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> <b>Home Visit available? </b>
                {specialistProfile.provideHomeVisitService ? (<Typography>&nbsp;&nbsp; : Yes, within {specialist.radius}km </Typography>)
                  : (<Typography>&nbsp;&nbsp; : No</Typography>)}<br />
                <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> <b>About Me:</b><br />
                <Typography variant="h6">
                  {specialistProfile.aboutMe}
                </Typography>
              </div>
            </Grid>
          </Box>

          {/* My Service List */}
          <div className={classes.service}>
            <Typography variant="h5">
              My Service List{" "}&nbsp;
              <Link to="/specialist/myprofile/editservice">
                {
                  <IconButton className={classes.editButton} size="small">
                    <EditIcon />
                  </IconButton>
                }
              </Link>
            </Typography>

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
              <TabPanel value={valueProduct}
                margin="0"
                padding="0"
                index={index}
                className={classes.table}>
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
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                }
              </TabPanel>
            ))}
          </div>
        </div>
      </Container>
    );
  } else {
    return (
      <div>
        <Grid style={{ textAlign: "center" }}>
          <CircularProgress />
        </Grid>
      </div >
    );
  }
};
