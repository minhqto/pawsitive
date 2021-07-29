import React from "react";

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

function EditSpecialistProfileModal({ cancelClick }) {
  const classes = useStyles();

  const updateSpecialistInfo = () => {};

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
            defaultValue={""}
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="Last Name"
            defaultValue={""}
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="Business name"
            defaultValue={""}
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="Phone Number"
            defaultValue={""}
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="Email"
            defaultValue={""}
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="Image URL"
            defaultValue={""}
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="Country"
            defaultValue={""}
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="City"
            defaultValue={""}
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="Street Address"
            defaultValue={""}
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="Province"
            defaultValue={""}
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="Postal Code"
            defaultValue={""}
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>

        <Grid item xs={12}>
          <h3>About Me</h3>

          <TextareaAutosize
            rowsMin={3}
            style={{ width: "100%" }}
            placeholder="About me"
            defaultValue={""}
            onChange={(e) => {}}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default EditSpecialistProfileModal;
