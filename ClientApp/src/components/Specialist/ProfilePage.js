import React from "react";
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
  const [valueProduct, setValueProduct] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValueProduct(newValue);
  };

  return (
    <div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4} direction="row" justifyContent="center">
            <img
              className={classes.root}
              src="https://images.pexels.com/photos/5749784/pexels-photo-5749784.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            /><br />
            <Button className={classes.button} color="primary">
              Edit Picture
            </Button>
          </Grid>

          <Grid item xs={8} direction="column">
            <Typography variant="h5">
              Bread Pitt <Button color="primary">Edit</Button>
            </Typography>
            <br />
            <Typography variant="subtitle1">
              Address: 444, Queen St W, Toronto, Ontario, J5J 5J5
            </Typography>
            <Typography variant="subtitle1">Phone#: (999) 999-9999</Typography>
            <Typography variant="subtitle1">
              Email: breadpitt@example.com
            </Typography>
            <Typography variant="subtitle1">
              Business Name: *Not informed
            </Typography>
            <Typography variant="subtitle1">About Me: </Typography>
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
                {rowsService.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.fee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};
