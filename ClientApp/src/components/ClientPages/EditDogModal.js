import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Button,
  makeStyles,
  Modal,
  TextField,
  Paper,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
} from "@material-ui/core";
import EditClientModal from "./EditClientModal";
import AddDogModal from "./AddDogModal";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import MUIRichTextEditor from "mui-rte";
import { convertToRaw, convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
import axios from "axios";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    marginRight: "20px",
  },
  clientImg: {
    width: "200px",
  },
  clientName: {
    fontSize: "1.3em",
    fontWeight: "500",
  },
  clientAddress: {
    fontSize: "1.1em",
    color: "grey",
  },
  clientBio: {
    fontSize: "1em",
    fontStyle: "italic",
  },
  petSection: {
    marginTop: "20px",
  },
  dogItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  dogImg: {
    width: "150px",
    marginRight: "20px",
  },
  dogInfo: {
    fontSize: "1.2em",
    fontWeight: "500",
  },
  editButton: {
    height: "30px",
    marginLeft: "20px",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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

const EditDogModal = ({ cancelClick, dog }) => {
  console.log(dog);
  const classes = useStyles();
  const [dogName, setDogName] = useState(dog.dogName);
  const [dogNameErr, setDogNameErr] = useState("");
  const [dogSex, setDogSex] = useState(dog.dogSex);
  const [dogBreed, setDogBreed] = useState(dog.dogBreed);
  const [dogWeight, setDogWeight] = useState(dog.dogWeight);
  const [dogBirthDate, setDogBirthDate] = useState(dog.birthDate);
  const [dogBiteHistory, setDogBiteHistory] = useState(dog.hasBiteHistory);
  const [dogIsVaccinated, setDogIsVaccinated] = useState(dog.isVaccinated);
  const [imageUrl, setImageUrl] = useState(dog.imageUrl);
  const [aboutDog, setAboutDog] = useState(dog.aboutDog ? dog.aboutDog : "");

  const getAboutDog = (state) => {
    const rteContent = convertToRaw(state.getCurrentContent());
    setAboutDog(JSON.stringify(rteContent));

    // How to convert state to HTML, for future display purpose
    // let contentState = convertFromRaw(JSON.parse(jsonRte)); // convert json string to content state object
    // let html = convertToHTML(contentState); // convert content state object to html
    // console.log(html); // display the html
  };

  const editDog = () => {
    if (!isValidInput()) return;

    const dogObj = {
      dogName: dogName,
      dogSex: dogSex,
      dogBreed: dogBreed,
      dogWeight: dogWeight,
      birthDate: dogBirthDate,
      hasBiteHistory: dogBiteHistory,
      isVaccinated: dogIsVaccinated,
      aboutDog: aboutDog,
      imageUrl: imageUrl,
      dogId: dog.id,
    };

    axios
      .put(`/api/Client/clientDetail/editDog`, dogObj)
      .then((res) => {
        alert("Dog updated successfully");
        window.location.reload();
      })
      .catch((e) => console.log(e));
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
          <h1>Edit dog</h1>
        </Grid>
        <hr></hr>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Name"
            defaultValue={dogName}
            InputLabelProps={{ required: true }}
            variant="outlined"
            error={dogNameErr != ""}
            helperText={dogNameErr}
            onChange={(e) => {
              setDogName(e.target.value);
              setDogNameErr("");
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Breed"
            defaultValue={dogBreed}
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
            defaultValue={dogWeight}
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
            defaultValue={new Date(dogBirthDate).toISOString().split("T")[0]}
            onChange={(e) => {
              setDogBirthDate(e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Sex"
            defaultValue={dogSex}
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
            defaultValue={imageUrl}
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
            value={dogIsVaccinated.toString()}
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
            value={dogBiteHistory.toString()}
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
            placeholder="About me"
            defaultValue={aboutDog}
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
            onClick={editDog}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditDogModal;
