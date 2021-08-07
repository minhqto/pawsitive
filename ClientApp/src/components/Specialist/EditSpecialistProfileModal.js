import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  makeStyles,
  TextField,
  TextareaAutosize,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import DistanceSlider from "../DistanceSlider";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "70%",
    margin: "50px auto",
    height: "90vh",
    overflow: "scroll",
  },
}));

function EditSpecialistProfileModal({
  cancelClick,
  specialistInfo,
  specialistId,
}) {
  const classes = useStyles();
  const [specObj, setSpecObj] = useState(specialistInfo);
  const [serviceTypes, setServiceTypes] = useState([]);

  const SERVICE_TYPES = [
    {
      name: "Training",
      label: "Dog Training",
    },
    {
      name: "Grooming",
      label: "Dog Grooming",
    },
    {
      name: "Pet Food",
      label: "Dog Food",
    },
    {
      name: "Therapy",
      label: "Therapy",
    },
  ];

  const updateSpecialistInfo = () => {
    if (validateInput()) {
      specObj.serviceTypes = serviceTypes;
      // make api call to update client information
      axios
        .put(`/api/Specialist/editSpecialist/${specialistId}`, specObj)
        .then((res) => {
          alert("Information updated successfully!");
          window.location.reload();
        })
        .catch((e) => console.error(e));
    }
  };

  const validateInput = () => {
    for (var key of Object.keys(specObj)) {
      if (
        key == "businessName" ||
        key == "radius" ||
        key == "provideHomeVisitService" ||
        key == "serviceTypes"
      )
        continue;

      if (specObj[key] == "") {
        alert(
          "Invalid input, make sure all the required fields are not empty!"
        );
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
          <h1>Edit your profile</h1>
        </Grid>
        <hr></hr>
        <Grid item xs={4}>
          <TextField
            fullWidth={true}
            label="First Name"
            defaultValue={specialistInfo.firstName}
            variant="outlined"
            name="firstName"
            InputLabelProps={{ required: true }}
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
            InputLabelProps={{ required: true }}
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
            InputLabelProps={{ required: true }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Business name"
            defaultValue={specialistInfo.businessName}
            variant="outlined"
            name="businessName"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Profile Image URL"
            defaultValue={specialistInfo.imageUrl}
            variant="outlined"
            name="imageUrl"
            InputLabelProps={{ required: true }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth={true}
            label="Street Address"
            defaultValue={specialistInfo.streetAddress}
            variant="outlined"
            name="streetAddress"
            InputLabelProps={{ required: true }}
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
            InputLabelProps={{ required: true }}
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
            InputLabelProps={{ required: true }}
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
            InputLabelProps={{ required: true }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth={true}
            label="Phone Number"
            defaultValue={specialistInfo.phoneNumber}
            variant="outlined"
            name="phoneNumber"
            InputLabelProps={{ required: true }}
            onChange={handleChange}
          />
        </Grid>

        <Grid item md={8}>
          <FormLabel>Service Types you offer (check all that apply)</FormLabel>
          <div>
            {SERVICE_TYPES.map((s, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    defaultChecked={specObj.serviceTypes.includes(s.name)}
                    disabled={specObj.serviceTypes.includes(s.name)}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setServiceTypes(
                          serviceTypes.filter((item) => item !== s.name)
                        );
                      } else {
                        setServiceTypes([...serviceTypes, s.name]);
                      }
                    }}
                    name={s.name}
                    color="primary"
                  />
                }
                label={s.label}
              />
            ))}
          </div>
        </Grid>

        <Grid item xs={4}>
          <FormControlLabel
            value="top"
            control={
              <Checkbox
                defaultChecked={specObj.provideHomeVisitService}
                onChange={() =>
                  setSpecObj({
                    ...specObj,
                    provideHomeVisitService: !specObj.provideHomeVisitService,
                  })
                }
                color="primary"
              />
            }
            //id="ProvideHomeVisitService"
            label="Provide Home Visit Service?"
            name="provideHomeVisitService"
            labelPlacement="end"
          />
          {specObj.provideHomeVisitService && (
            <DistanceSlider
              defaultValue={specObj.radius}
              setValue={(value) => {
                setSpecObj({ ...specObj, radius: value });
              }}
              id="radius"
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <h6>About Me (Required)</h6>
          <TextareaAutosize
            rowsMin={5}
            rowsMax={6}
            style={{ width: "100%" }}
            placeholder="About me (Certification, experience, service detail...)"
            defaultValue={specialistInfo.aboutMe}
            InputLabelProps={{ required: true }}
            name="aboutMe"
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button onClick={cancelClick} variant="contained">
            Cancel
          </Button>
          <Button
            style={{ marginLeft: "20px" }}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={updateSpecialistInfo}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditSpecialistProfileModal;
