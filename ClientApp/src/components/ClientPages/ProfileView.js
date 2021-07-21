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
} from "@material-ui/core";
import EditClientModal from "./EditClientModal";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import MUIRichTextEditor from "mui-rte";
import { convertToRaw, convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
import axios from "axios";

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

export default function ProfileView() {
  const classes = useStyles();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isAuthorized, setAuthorized] = useState(false);
  const [clientProfile, setClientProfile] = useState(null);
  const [openClientProfileModal, setOpenClientProfileModal] = useState(false);
  const [openAddDogModal, setOpenAddDogModal] = useState(false);
  const [openEditDogModal, setOpenEditDogModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      setAuthorized(true);
      getClientInfo(user.id);
    }
  }, [user]);

  const getClientInfo = (clientId) => {
    // get current client information based on client id
    axios
      .get(`/api/Client/clientDetail/${clientId}`)
      .then((res) => {
        console.log(res.data);
        setClientProfile(res.data.clientProfile);
      })
      .catch((e) => console.log(e));
  };

  // const getAboutMeHTML = () => {
  //   let contentState = convertFromRaw(JSON.parse(clientProfile.aboutMe)); // convert json string to content state object
  //   let html = convertToHTML(contentState); // convert content state object to html

  //   return html;
  // };

  if (clientProfile) {
    const { imageUrl, firstName, lastName, address } = clientProfile.client;
    const { aboutMe, dogs } = clientProfile;

    return (
      <Container>
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
        >
          {/* Client Info */}
          <div className={classes.imgContainer}>
            <img
              className={classes.clientImg}
              src={imageUrl}
              alt="Client Image"
            />
          </div>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <div
              className={classes.clientName}
            >{`${firstName} ${lastName}`}</div>
            <div
              className={classes.clientAddress}
            >{`${address.streetAddress}, ${address.city}, ${address.province} ${address.postalCode}, ${address.country}`}</div>
            {/* <div
              dangerouslySetInnerHTML={{ __html: getAboutMeHTML() }}
              className={classes.clientBio}
            ></div> */}
            <p>{aboutMe}</p>
          </Box>
          {isAuthorized && (
            <Button
              className={classes.editButton}
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => setOpenClientProfileModal(true)}
            >
              Edit
            </Button>
          )}
          <Modal
            open={openClientProfileModal}
            onClose={() => setOpenClientProfileModal(false)}
          >
            <EditClientModal
              clientProfile={clientProfile}
              cancelClick={() => setOpenClientProfileModal(false)}
            />
          </Modal>
        </Box>

        {/* Pet Info */}
        <Grid className={classes.petSection} container spacing={3}>
          <Grid item xs={12}>
            <h3>
              My Pets{" "}
              {isAuthorized && (
                <Button
                  className={classes.editButton}
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpenAddDogModal(true)}
                >
                  Add
                </Button>
              )}
              <Modal
                open={openAddDogModal}
                onClose={() => setOpenAddDogModal(false)}
              >
                <AddDogModal
                  clientId={user.id}
                  cancelClick={() => setOpenAddDogModal(false)}
                />
              </Modal>
            </h3>
          </Grid>

          {/* Each pet detail */}
          {dogs.map((dog, index) => (
            <Grid key={index} className={classes.dogItem} item xs={6}>
              <img className={classes.dogImg} src={dog.imageUrl} />
              <div className={classes.dogInfo}>{dog.dogName}</div>
              {isAuthorized && (
                <Button
                  className={classes.editButton}
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpenEditDogModal(true)}
                >
                  Edit
                </Button>
              )}

              <Modal
                open={openEditDogModal}
                onClose={() => setOpenEditDogModal(false)}
              >
                <EditDogModal
                  dog={dog}
                  cancelClick={() => setOpenEditDogModal(false)}
                />
              </Modal>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else {
    // Show loading component
    return <h1>Loading...</h1>;
  }
}

const AddDogModal = ({ cancelClick, clientId }) => {
  const classes = useStyles();
  const [dogName, setDogName] = useState("");
  const [dogAge, setDogAge] = useState(0);
  const [dogSex, setDogSex] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogWeight, setDogWeight] = useState(0);
  const [dogBirthDate, setDogBirthDate] = useState(Date.now());
  const [dogBiteHistory, setDogBiteHistory] = useState(false);
  const [dogIsVaccinated, setDogIsVaccinated] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [aboutDog, setAboutDog] = useState("");

  const getAboutDog = (state) => {
    const rteContent = convertToRaw(state.getCurrentContent());
    setAboutDog(rteContent);

    // How to convert state to HTML, for future display purpose
    // let contentState = convertFromRaw(JSON.parse(jsonRte)); // convert json string to content state object
    // let html = convertToHTML(contentState); // convert content state object to html
    // console.log(html); // display the html
  };

  const addNewDog = () => {
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
      .catch((e) => console.log(e));
  };

  return (
    <div className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Add new dog: </h1>
          <div>
            <Button
              style={{ marginRight: "20px" }}
              variant="contained"
              color="primary"
              onClick={addNewDog}
            >
              Add dog
            </Button>
            <Button onClick={cancelClick} variant="contained">
              Cancel
            </Button>
          </div>
        </Grid>
        <hr></hr>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Name"
            defaultValue=""
            variant="outlined"
            onChange={(e) => {
              setDogName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Weight"
            defaultValue=""
            variant="outlined"
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
            onChange={(e) => {
              setDogBirthDate(e.target.value);
            }}
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
          <MUIRichTextEditor
            label="Tell us about your dog!"
            onChange={getAboutDog}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const EditDogModal = ({ cancelClick, dog }) => {
  console.log(dog);
  const classes = useStyles();
  const [dogName, setDogName] = useState(dog.dogName);
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

  return (
    <div className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Edit dog: </h1>
          <div>
            <Button
              style={{ marginRight: "20px" }}
              variant="contained"
              color="primary"
              onClick={editDog}
            >
              Edit dog
            </Button>
            <Button onClick={cancelClick} variant="contained">
              Cancel
            </Button>
          </div>
        </Grid>
        <hr></hr>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Name"
            defaultValue={dogName}
            variant="outlined"
            onChange={(e) => {
              setDogName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Weight"
            defaultValue={dogWeight}
            variant="outlined"
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
            onChange={(e) => {
              setDogBirthDate(e.target.value);
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
          <MUIRichTextEditor
            label="Tell us about your dog!"
            onChange={getAboutDog}
          />
        </Grid>
      </Grid>
    </div>
  );
};
