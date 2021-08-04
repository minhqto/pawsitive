import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "reactstrap/lib/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  IconButton,
  Container,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import EditIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';
import PetsIcon from '@material-ui/icons/Pets';

import axios from "axios";
import EditSpecialistProfileModal from "./EditSpecialistProfileModal";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    maxHeight: 300,
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
  table: {
    marginTop: 30,
    maxWidth: "100%",
  },
  marginTop: {
    marginTop: 20,
  },
  imgContainer: {
    margin: "20px",
    marginBotton: "20px",
    marginRight: "20px",
    marginLeft: "20px",
    width: "300px",
    height: "300px",
  },
  clientImg: {
    width: "200px",
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
              }}
              specialistId={user.id}
            />
          </Modal>
          <Grid mb={1} >
            <h3>
              My Profile
            </h3>
          </Grid>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={3}
                direction="row"
                justifyContent="center"
                alignItems="center">
                <div className={classes.imgContainer}>
                  {specialist.imageUrl ? (<img
                    className={classes.root}
                    src={specialist.imageUrl}
                    alt="Client Image"
                  />) : (
                    <FaceIcon color="disabled" style={{ fontSize: 150 }} />)}
                </div>
                <br />
                <Typography variant="subtitle1">
                  <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> Phone#: {specialist.phoneNumber}<br />
                  <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> Email: {specialist.email}<br />
                </Typography>

              </Grid>

              <Grid item xs={8} direction="column">
                <Typography variant="h5">
                  {specialist.firstName} {specialist.lastName}{" "}
                  &nbsp;
                  {(
                    <IconButton
                      className={classes.editButton}
                      size="small"
                      onClick={() => setOpenEditSpecialistModal(true)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </Typography>
                <br />
                <Typography variant="subtitle1">
                  <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> Business Name: {specialistProfile.businessName}<br />
                  <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> Address:
                  {specialist.address.streetAddress},{specialist.address.city},
                  {specialist.address.province}, {specialist.address.postalCode}<br />
                  <PetsIcon color="action" style={{ fontSize: 15, color: "#89CFF0" }} /> About Me:<br />
                  {specialistProfile.aboutMe}
                </Typography>
              </Grid>
            </Grid>

            {/* My Service List */}
            <div className={classes.table}>
              <Typography variant="h5">
                My Service List{" "}
                <Link to="/specialist/myprofile/editservice">
                  &nbsp;
                  {(
                    <IconButton
                      className={classes.editButton}
                      size="small"

                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </Link>
              </Typography>
              <TableContainer component={Paper} className={classes.marginTop}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Service Name</TableCell>
                      <TableCell align="right">Fee</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {services.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.serviceName}
                        </TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div >
      </Container>
    );
  } else {
    return <div className={classes.root}>
      <CircularProgress />
    </div>;
  }
};
