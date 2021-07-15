import React, { useEffect, useState } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DataGrid, gridRowsLookupSelector } from '@material-ui/data-grid';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, Box, Grid, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import PawsitiveTheme from "../../Theme";
import { useHistory } from "react-router-dom";

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';


const useStyles = makeStyles((theme) => ({

    paper: {
        margin: theme.spacing(2, 0),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: '100%',
        marginBottom: theme.spacing(1),
    },

    submit: {
        margin: theme.spacing(1, 0, 2),
    },

    margin: {
        margin: theme.spacing(1),
    },

    table: {
        minWidth: 750,
    },

    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },

}));

let specialistInfo = {
    serviceTypes: [
        { id: 1, ServiceTypeName: 'TTraining' },
        { id: 2, ServiceTypeName: 'GGrooming' },
        { id: 3, ServiceTypeName: 'DDog Food' },
    ],
    services: [
        { id: 1, name: 'BBehaviour Training 1 day(Big dogs)', servicePrice: 70 },
        { id: 2, name: 'BBehaviour Training 1 day(Small dogs)', servicePrice: 50 },
        { id: 3, name: '3 Days Packages', servicePrice: 130 },
        { id: 4, name: '5 Days Packages', servicePrice: 180 },
    ],
};

const rows = [
    { name: 'Behaviour Training 1 day(Big dogs)', servicePrice: 70 },
    { name: 'Behaviour Training 1 day(Small dogs)', servicePrice: 50 },
    { name: '3 Days Packages', servicePrice: 130 },
    { name: '5 Days Packages', servicePrice: 180 },
];


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
    return order === 'desc'
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
    { id: 'name', numeric: false, disablePadding: true, label: 'Service Name' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Fee ($)' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const pawTheme = PawsitiveTheme;

    return (
        <ThemeProvider theme={pawTheme}>
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Select items to delete
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon />
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
    const [isAuthorized, setAuthorized] = useState(false);
    let { routeId } = useParams();
    const [clientProfile, setClientProfile] = useState(null);

    const [serviceList, setServiceList] = useState("");
    const [serviceTypes, setServiceTypes] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [servicePrice, setServicePrice] = useState(0.00);
    const [serviceNameError, setServiceNameError] = useState("");
    const [servicePriceError, setServicePriceError] = useState("");
    const [serverError, setServerError] = useState("");

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
        if (isAuthenticated) {
            setAuthorized(true);
            getService(user.id);
            console.log("UserID: " + user.id);
        }
    }, [user]);

    const getService = (specialistId) => {
        //console.log("in getService: " + specialistId);
        // get current client information based on client id
        axios.get(`/api/specialist/specialistDetail/${specialistId}`).then((res) => {
            console.log("getService Result: " + res.data);
            setClientProfile(res.data.specialistProfile);
            setServiceList(res.data.specialistProfile.ServiceList);
            setServiceTypes(res.data.specialistProfile.ServiceTypes);
            console.log("ClientProfile: " + clientProfile);
            console.log("ServiceList: " + serviceList);
            console.log("ServiceTypes: " + serviceTypes);
        });
    };

    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const columns = [
        { field: 'serviceName', headerName: 'Service Name', width: 300 },
        {
            field: 'servicePrice',
            headerName: 'Fee ($) ',
            type: 'number',
            width: 130,
        },
    ];

    // TODO - add the real data from server
    // Test Data - TO BE deleted when back-end was emplmented


    // const ServiceList = [{
    //     serviceName: "",
    //     servicePrice: 0,
    // }]

    const addOnClick = (event) => {
        event.preventDefault();
        console.log("Add Button Clicked");
        if (validateAddRequest()) {
            console.log("Add Request is going..");
            const reqBody = [{
                serviceName: serviceName,
                servicePrice: servicePrice,
            }];
            axios
                .post("/api/specialist/addservice", reqBody)
                .then((res) => {
                    if (res.status === 200) {
                        //TODO - reload Service List  with the added item
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
    }

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
    }

    // Material UI Table
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
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

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    // Mine

    // const validateDeleteRequest = () => {
    //     if (serviceName === "") {
    //         setServiceNameError("Service Name is required");
    //         return false;
    //     } else {
    //     }
    //     return true;
    // }

    const deleteOnClick = (event) => {
        event.preventDefault();
        console.log("Delete Button Clicked");

        // TODO - set the toBeDeleted service list

        var toBeDeleted = {};


        if (toBeDeleted) {
            console.log("Delete Request is going..");
            const reqBody = [{
                serviceName: serviceName,
                servicePrice: servicePrice,
            }];
            axios
                .post("/api/specialist/deleteservice", reqBody)
                .then((res) => {
                    if (res.status === 200) {
                        //TODO - reload Service List  with the added item
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
    }

    // if (serviceList) {
    //     const { aboutMe, dogs } = serviceList;

    return (
        <ThemeProvider theme={pawTheme}>
            <Grid mb={1} >
                <Typography component="h1" variant="h6" >
                    My Profile &gt; Edit Service List
                </Typography>
            </Grid>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <div className={classes.paper}>
                    <div>
                        <Paper square>
                            <Tabs
                                value={value}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={handleChange}
                                aria-label="tabs for service type"
                                mb={1}
                            >
                                <Tab label="Training" />
                                <Tab label="Grooming" />
                                <Tab label="Dog Food" />
                            </Tabs>
                        </Paper>

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
                                        rowCount={rows.length}
                                    />
                                    <TableBody>
                                        {stableSort(rows, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.name);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.name)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                checked={isItemSelected}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        </TableCell>
                                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.serviceName}</TableCell>
                                                        <TableCell align="right">{row.servicePrice}</TableCell>
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
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                            <EnhancedTableToolbar numSelected={selected.length} />
                        </Paper>
                        <Typography component="h1" variant="h6">
                            Add a new Service
                        </Typography>
                        <div>
                            <Grid container spacing={0}>
                                <Grid item xs={6} >
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
                                <Grid item xs={3} >
                                    <TextField
                                        label="Service Fee"
                                        id="new_service_price"
                                        className={clsx(classes.margin)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
                                <Grid item xs={3} >
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
                    </div >
                </div>
            </Container>
        </ThemeProvider>
    );
};
//}

export default EditService;