import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DataGrid } from '@material-ui/data-grid';
import clsx from 'clsx';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Paper from "@material-ui/core/Paper";
import { Container, Box, Grid, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import PawsitiveTheme from "../../Theme";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({

    paper: {
        margin: theme.spacing(5, 2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    submit: {
        margin: theme.spacing(1, 0, 2),
    },

    margin: {
        margin: theme.spacing(1),
    },

}));

const EditService = () => {
    const classes = useStyles();
    const pawTheme = PawsitiveTheme;
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [isAuthorized, setAuthorized] = useState(false);
    let { routeId } = useParams();

    const [serviceName, setServiceName] = useState("");
    const [servicePrice, setServicePrice] = useState(0.00);
    const [serviceNameError, setServiceNameError] = useState("");
    const [servicePriceError, setServicePriceError] = useState("");
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        console.log(routeId);
        console.log(user.id);
        if (isAuthenticated && user.id === routeId) {
            console.log("hit here");
            setAuthorized(true);
        }
    }, [user]);

    const columns = [
        { field: 'serviceName', headerName: 'Service Name', width: "70%" },
        {
            field: 'servicePrice',
            headerName: 'Fee ($) ',
            type: 'number',
            width: "30",
        },
    ];

    // TODO - add the real data from server
    // Test Data - TO BE deleted when back-end was emplmented
    const rows = [
        { id: 1, serviceName: 'Behaviour Training 1 day(Big dogs)', servicePrice: 70 },
        { id: 2, serviceName: 'Behaviour Training 1 day(Small dogs)', servicePrice: 50 },
        { id: 3, serviceName: '3 Days Packages', servicePrice: 130 },
        { id: 4, serviceName: '5 Days Packages', servicePrice: 180 },
    ];

    const ServiceList = [{
        serviceName: "",
        servicePrice: 0.00,
    }]


    const addOnClick = (event) => {
        event.preventDefault();
        console.log("Add Button Clicked");
        if (validateRequest()) {
            console.log("Request is going..");
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

    const validateRequest = () => {
        if (serviceName === "") {
            setServiceNameError("Service Name is required");
            return false;
        } else {
            setServiceNameError("");
        }

        if (servicePrice === 0.00) {
            setServicePriceError("Service Fee is required");
            return false;
        } else {
            setServicePriceError("");
        }
        return true;
    }

    const deleteOnClick = (event) => {
        event.preventDefault();
        console.log("Delete Button Clicked");
        if (validateRequest()) {
            console.log("Request is going..");
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

    return (
        <ThemeProvider theme={pawTheme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar src="https://i.imgur.com/WHw5aeR.jpg"></Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Service List
                    </Typography>
                    <div>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                fullWidth
                                color="primary"
                                className={classes.submit}
                                onClick={(event) => {
                                    deleteOnClick(event);
                                }} >
                                Delete the selected Items
                            </Button></div>

                        <h5>Add a new Service</h5>
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

export default EditService;