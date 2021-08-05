import React, { useEffect, useState } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Container, Box, Grid, Button, Link, } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import PawsitiveTheme from "../../Theme";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(1, 0, 2),
  },

  margin: {
    margin: theme.spacing(1),
  },

  table: {
    minWidth: 400,
  },

  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Service Name" },
  { id: "price", numeric: true, disablePadding: false, label: "Fee ($)" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, onDeleteClick } = props;
  const pawTheme = PawsitiveTheme;

  return (
    <ThemeProvider theme={pawTheme}>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
            textAlign="left"
          >
            Select items to delete
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon onClick={onDeleteClick} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </ThemeProvider>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const EditService = () => {
  const classes = useStyles();
  const pawTheme = PawsitiveTheme;
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [specialistProfile, setSpecialistProfile] = useState("");

  const [serviceType, setServiceType] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState(0.0);
  const [serviceNameError, setServiceNameError] = useState("");
  const [servicePriceError, setServicePriceError] = useState("");
  const [serverError, setServerError] = useState("");

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let specialistId;

  useEffect(() => {
    if (isAuthenticated) {
      getService(user.id);
      specialistId = user.id;
    }
  }, [user]);

  const getService = (specialistId) => {
    //console.log("in getService: " + specialistId);
    // get current client information based on client id
    axios
      .get(`/api/specialist/specialistDetail/${specialistId}`)
      .then((res) => {
        let specProfile = res.data.specialistProfile;
        setSpecialistProfile(res.data.specialistProfile);
        if (specProfile.serviceTypes.length != 0) {
          setServiceType(specProfile.serviceTypes[0]);
        }
      });
  };

  const { serviceTypes, services } = specialistProfile;

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChangeTabs = (event, index) => {
    setTabIndex(index);
    setServiceType(serviceTypes[index]);
  };

  const addOnClick = (event) => {
    event.preventDefault();
    console.log("Add Button Clicked");
    if (validateAddRequest()) {
      const serviceObj = {
        serviceType: serviceType.serviceTypeName,
        serviceName: serviceName,
        price: parseFloat(servicePrice),
      };

      axios
        .post(
          `/api/Specialist/specialistDetail/${user.id}/addservice`,
          serviceObj
        )
        .then((res) => {
          if (res.status === 200) {
            alert("New service added successfully. Reloading...");
            window.location.reload();
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          const { message } = err.response.data;
          console.error(err);
          setServerError(message);
        });
    }
  };

  const validateAddRequest = () => {
    if (serviceName === "") {
      setServiceNameError("Service Name is required");
      return false;
    } else {
      setServiceNameError("");
    }

    if (servicePrice === 0) {
      setServicePriceError("Service Fee is required");
      return false;
    } else {
      setServicePriceError("");
    }
    return true;
  };

  // Material UI Table
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    let newSelected = [...selected];
    if (event.target.checked) {
      services
        .filter(
          (s) => s.serviceType.serviceTypeName == serviceType.serviceTypeName
        )
        .map((n) => n.id)
        .forEach((serviceId) => {
          if (!selected.includes(serviceId)) {
            newSelected.push(serviceId);
          }
        });

      setSelected(newSelected);
    } else {
      services
        .filter(
          (s) => s.serviceType.serviceTypeName == serviceType.serviceTypeName
        )
        .map((n) => n.id)
        .forEach((serviceId) => {
          const index = selected.indexOf(serviceId);
          newSelected.splice(index, 1);
        });
    }
  };

  const handleClick = (event, service) => {
    let newSelected = [...selected];
    if (selected.includes(service.id)) {
      // delete the current service from selected services
      const index = selected.indexOf(service.id);
      newSelected.splice(index, 1);
    } else {
      newSelected.push(service.id);
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (service) => selected.includes(service.id);

  let emptyRows = 0;

  if (services) {
    emptyRows =
      rowsPerPage - Math.min(rowsPerPage, services.length - page * rowsPerPage);
  }

  const deleteOnClick = (event) => {
    event.preventDefault();

    console.log(selected);
    if (selected.length != 0) {
      const reqBody = {
        serviceIds: selected,
      };
      axios
        .delete(`/api/Specialist/specialistDetail/${user.id}/deleteservices`, {
          data: reqBody,
        })
        .then((res) => {
          if (res.status === 200) {
            //TODO - reload Service List  with the added item
            alert("Services deleted successfully. Reloading...");
            window.location.reload();
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          const { message } = err.response.data;
          console.error(err);
          setServerError(message);
        });
    }
  };

  return (
    <Container>
      <Grid mb={1}>
        <Typography variant="h5">
          <Link href="/specialist/myprofile" color="inherit">My Profile</Link> &gt; Edit Service List
        </Typography>
      </Grid>
      <Grid>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <div className={classes.paper}>
            <div>
              <Paper square>
                <Tabs
                  value={tabIndex}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChangeTabs}
                  aria-label="tabs for service type"
                  mb={1}
                >
                  {serviceTypes ? (
                    serviceTypes.map((serviceType, index) => (
                      <Tab
                        key={index}
                        label={serviceType.serviceTypeName}
                        id={serviceType.id}
                      />
                    ))
                  ) : (
                    <CircularProgress gravity="center" />
                  )}
                </Tabs>
              </Paper>
              {services ? (
                <Paper className={classes.paper}>
                  <TableContainer>
                    <Table
                      className={classes.table}
                      aria-labelledby="tableTitle"
                      aria-label="enhanced table"
                    >
                      <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={
                          services.filter(
                            (s) =>
                              s.serviceType.serviceTypeName ==
                              serviceType.serviceTypeName
                          ).length
                        }
                      ></EnhancedTableHead>

                      <TableBody>
                        {services
                          .filter(
                            (s) =>
                              s.serviceType.serviceTypeName ==
                              serviceType.serviceTypeName
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelected(row);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                onClick={(event) => handleClick(event, row)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.serviceName}
                                selected={isItemSelected}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ "aria-labelledby": labelId }}
                                  />
                                </TableCell>
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                >
                                  {row.serviceName}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={
                      services.filter(
                        (s) =>
                          s.serviceType.serviceTypeName ==
                          serviceType.serviceTypeName
                      ).length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                  <EnhancedTableToolbar
                    numSelected={selected.length}
                    onDeleteClick={(e) => deleteOnClick(e)}
                  />
                </Paper>
              ) : (
                <Paper className={classes.paper}>
                  <CircularProgress />
                </Paper>
              )}

              {/* Add new service section */}
              <Typography component="h1" variant="h6">
                Add a new Service
              </Typography>
              <div>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <TextField
                      label="Service Name"
                      id="new_service_name"
                      className={clsx(classes.margin)}
                      onChange={(e) => {
                        setServerError("");
                        setServiceNameError("");
                        setServiceName(e.target.value);
                      }}
                      error={serviceNameError !== ""}
                      helperText={serviceNameError}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Service Fee"
                      id="new_service_price"
                      className={clsx(classes.margin)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        setServerError("");
                        setServicePriceError("");
                        setServicePrice(e.target.value);
                      }}
                      error={servicePriceError !== ""}
                      helperText={servicePriceError}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={(event) => {
                        addOnClick(event);
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Container>
      </Grid>
    </Container>
  );
};
//}

export default EditService;
