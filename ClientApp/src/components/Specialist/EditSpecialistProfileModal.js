import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  makeStyles,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "70%",
    margin: "50px auto",
    height: "90vh",
  },
}));

function EditSpecialistProfileModal({
  cancelClick,
  specialistInfo,
  specialistId,
}) {
  const classes = useStyles();
  const [specObj, setSpecObj] = useState(specialistInfo);
  const updateSpecialistInfo = () => {
    console.log(specObj);

    if (validateInput()) {
      // make api call to update client information
      axios
        .put(`/api/Specialist/editSpecialist/${specialistId}`, specObj)
        .then((res) => {
          alert("Information updated successfully! Reloading...");
          window.location.reload();
        })
        .catch((e) => console.error(e));
    }
  };

  const validateInput = () => {
    for (var key of Object.keys(specObj)) {
      if (specObj[key] == "") {
        alert("Invalid input, make sure all the fields are not empty!");
        return false;
      }
    }
    return true;
  };

  const handleChange = (e) => {
    setSpecObj({
      ...specObj,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={classes.paper}>
      {" "}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Edit your profile: </h1>
          <div>
            <Button
              style={{ marginRight: "20px" }}
              variant="contained"
              color="primary"
              onClick={updateSpecialistInfo}
            >
              Save changes
            </Button>
            <Button onClick={cancelClick} variant="contained">
              Cancel
            </Button>
          </div>
        </Grid>
        <hr></hr>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="First Name"
            defaultValue={specialistInfo.firstName}
            variant="outlined"
            name="firstName"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="Last Name"
            defaultValue={specialistInfo.lastName}
            variant="outlined"
            name="lastName"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="Business name"
            defaultValue={specialistInfo.businessName}
            variant="outlined"
            name="businessName"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="Phone Number"
            defaultValue={specialistInfo.phoneNumber}
            variant="outlined"
            name="phoneNumber"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="Email"
            defaultValue={specialistInfo.email}
            variant="outlined"
            name="email"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="Image URL"
            defaultValue={specialistInfo.imageUrl}
            variant="outlined"
            name="imageUrl"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="City"
            defaultValue={specialistInfo.city}
            variant="outlined"
            name="city"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="Street Address"
            defaultValue={specialistInfo.streetAddress}
            variant="outlined"
            name="streetAddress"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="Province"
            defaultValue={specialistInfo.province}
            variant="outlined"
            name="province"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="Postal Code"
            defaultValue={specialistInfo.postalCode}
            variant="outlined"
            name="postalCode"
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <h3>About Me</h3>

          <TextareaAutosize
            rowsMin={3}
            style={{ width: "100%" }}
            placeholder="About me"
            defaultValue={specialistInfo.aboutMe}
            name="aboutMe"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default EditSpecialistProfileModal;
