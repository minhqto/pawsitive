import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "reactstrap/lib/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
});

//Logic for My Service List
function createDataService(name, fee) {
  return { name, fee };
}
const rowsService = [
  createDataService("Behaviour Training 1 day(Big dogs)", 70),
  createDataService("Behaviour Training 1 day(Small dogs)", 50),
  createDataService("3 Days Packages", 130),
  createDataService("5 Days Packages", 180),
];

export const ProfilePage = function (specialistData) {
  const [valueProduct, setValueProduct] = useState(0);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [specialistProfile, setSpecialistProfile] = useState(null);
  const [services, setServices] = useState([]);

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
      <div>
        <Grid>
          <Typography component="h1" variant="h5" mb={3}>
            My Profile
          </Typography>
        </Grid>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={4} direction="row" justifyContent="center">
              <img className={classes.root} src={specialist.imageUrl} />
              <br />
            </Grid>

            <Grid item xs={8} direction="column">
              <Typography variant="h5">
                {specialist.firstName} {specialist.lastName}{" "}
                <Button color="primary">Edit</Button>
              </Typography>
              <br />
              <Typography variant="subtitle1">
                Address:
                {specialist.address.streetAddress},{specialist.address.city},
                {specialist.address.province}, {specialist.address.postalCode}
              </Typography>
              <Typography variant="subtitle1">
                Phone#: {specialist.phoneNumber}
              </Typography>
              <Typography variant="subtitle1">
                Email: {specialist.email}
              </Typography>
              <Typography variant="subtitle1">
                Business Name: {specialistProfile.businessName}
              </Typography>
              <Typography variant="subtitle1">About Me: </Typography>
              <Typography variant="subtitle2" paragraph>
                {specialistProfile.aboutMe}
              </Typography>
            </Grid>
          </Grid>

          {/* My Service List */}
          <div className={classes.table}>
            <Typography variant="h6">
              My Service List <Button color="primary">Edit</Button>
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
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};
