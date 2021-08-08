import React, { useState } from "react";
import {
  Grid,
  Button,
  makeStyles,
  TextField,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
} from "@material-ui/core";
import axios from "axios";
import SaveIcon from "@material-ui/icons/Save";

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

const AddDogModal = ({ cancelClick, clientId }) => {
  const classes = useStyles();
  const [dogNameErr, setDogNameErr] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogAge, setDogAge] = useState(0);
  const [dogSex, setDogSex] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogWeight, setDogWeight] = useState(0);
  const [dogBirthDate, setDogBirthDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dogBiteHistory, setDogBiteHistory] = useState(false);
  const [dogIsVaccinated, setDogIsVaccinated] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [aboutDog, setAboutDog] = useState("");

  const addNewDog = () => {
    if (!isValidInput()) return;

    const dogObj = {
      dogName: dogName,
      dogAge: dogAge,
      dogSex: dogSex,
      dogBreed: dogBreed,
      dogWeight: dogWeight,
      birthDate: dogBirthDate,
      hasBiteHistory: dogBiteHistory,
      isVaccinated: dogIsVaccinated,
      imageUrl: imageUrl,
      aboutDog: JSON.stringify(aboutDog),
    };

    axios
      .post(`/api/Client/clientDetail/${clientId}/addDog`, dogObj)
      .then((res) => {
        alert("Dog added successfully");
        window.location.reload();
      })
      .catch((e) =>
        alert(
          "Add dog failed. Please check your input and make sure you enter all information"
        )
      );
  };

  const isValidInput = () => {
    if (dogName == "") {
      setDogNameErr("Dog name must not be empty");
      return false;
    }

    return true;
  };

  return (
    <div className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Add new dog</h1>
        </Grid>
        <hr></hr>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Name"
            defaultValue=""
            variant="outlined"
            InputLabelProps={{ required: true }}
            onChange={(e) => {
              setDogName(e.target.value);
              setDogNameErr("");
            }}
            error={dogNameErr != ""}
            helperText={dogNameErr}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Breed"
            defaultValue=""
            variant="outlined"
            onChange={(e) => {
              setDogBreed(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Weight"
            defaultValue=""
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
            }}
            onChange={(e) => {
              setDogWeight(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Birth Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              setDogBirthDate(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Sex"
            defaultValue=""
            variant="outlined"
            onChange={(e) => {
              setDogSex(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Image URL"
            defaultValue=""
            variant="outlined"
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <h4>Is Vaccinated</h4>
          <RadioGroup
            aria-label="isVaccinated"
            name="isVaccinated"
            value={dogIsVaccinated}
            onChange={(e) => {
              setDogIsVaccinated(e.target.value);
            }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>

        <Grid item xs={6}>
          <h4>Has bite history</h4>
          <RadioGroup
            aria-label="biteHistory"
            name="biteHistory"
            value={dogBiteHistory}
            onChange={(e) => {
              setDogBiteHistory(e.target.value);
            }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <h3>About your dog</h3>
          <TextareaAutosize
            rowsMin={3}
            style={{ width: "100%" }}
            placeholder="About your dog"
            onChange={(e) => setAboutDog(e.target.value)}
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
            onClick={addNewDog}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddDogModal;
