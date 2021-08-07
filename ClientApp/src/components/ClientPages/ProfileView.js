import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Button,
  IconButton,
  makeStyles,
  Modal,
  Icon,
  Typography,
  TextField,
  Paper,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import EditClientModal from "./EditClientModal";
import AddDogModal from "./AddDogModal";
import EditDogModal from "./EditDogModal";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import MUIRichTextEditor from "mui-rte";
import { convertToRaw, convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FaceIcon from "@material-ui/icons/Face";
import PetsIcon from "@material-ui/icons/Pets";

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    margin: "20px",
    marginBotton: "20px",
    marginRight: "20px",
    marginLeft: "20px",
  },
  clientImg: {
    width: "200px",
  },
  clientName: {
    margin: "10px",
    fontSize: "1.25em",
    fontWeight: "500",
  },
  clientAddress: {
    fontSize: "1.1em",
  },
  clientBio: {
    fontSize: "1em",
    fontStyle: "italic",
  },
  petSection: {
    marginTop: "10px",
    fontsize: "1.1em",
  },
  dogItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  dogImg: {
    width: "150px",
  },
  dogInfo: {
    fontSize: "1.2em",
    fontWeight: "500",
  },
  editButton: {
    height: "30px",
    marginLeft: "0px",
    marginRight: "0px",
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
  const [selectedDogForEdit, setSelectedDogForEdit] = useState(null);
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

  const deleteDog = (dogId) => {
    axios
      .delete(`/api/Client/clientDetail/deleteDog/${dogId}`)
      .then((res) => {
        alert("Delete dog successfully! Reloading...");
        window.location.reload();
      })
      .catch((e) => console.log(e));
  };

  // const getAboutMeHTML = () => {
  //   let contentState = convertFromRaw(JSON.parse(clientProfile.aboutMe)); // convert json string to content state object
  //   let html = convertToHTML(contentState); // convert content state object to html

  //   return html;
  // };

  if (clientProfile) {
    const { imageUrl, firstName, lastName, email, phoneNumber, address } =
      clientProfile.client;
    const { aboutMe, dogs } = clientProfile;

    return (
      <Container>
        <Grid mb={1}>
          <h3>My Profile</h3>
        </Grid>
        <Box
          marginTop="20px"
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
        >
          {/* Client Info */}
          <div className={classes.imgContainer}>
            {imageUrl ? (
              <img
                className={classes.clientImg}
                src={imageUrl}
                alt="Client Image"
              />
            ) : (
              <FaceIcon color="disabled" style={{ fontSize: 150 }} />
            )}
          </div>
          {firstName != null ? (
            <Grid
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <div className={classes.clientName} alignItems="center">
                <h3>
                  {`${firstName} ${lastName}`}&nbsp;
                  {isAuthorized && (
                    <IconButton
                      className={classes.editButton}
                      size="small"
                      onClick={() => setOpenClientProfileModal(true)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </h3>
              </div>
              <div className={classes.clientAddress}>
                <b> Email: </b>
                {email} <br />
                <b> Phone: </b>
                {phoneNumber} <br />
                <b> Address: </b>
                {`${address.streetAddress}, ${address.city}, ${address.province} ${address.postalCode}, ${address.country}`}{" "}
                <br />
                <b> About Me: </b>
                {aboutMe}
                <br />
              </div>
              {/* <div
              dangerouslySetInnerHTML={{ __html: getAboutMeHTML() }}
              className={classes.clientBio}
            ></div> */}
            </Grid>
          ) : (
            <h5>
              You don't have any profile to display.
              <br />
              Please add your information.
              <br />
              <br />
              {isAuthorized && (
                <Button
                  className={classes.editButton}
                  margin="20px"
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpenClientProfileModal(true)}
                >
                  + Add Profile
                </Button>
              )}
            </h5>
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
        <Grid className={classes.petSection} container spacing={2}>
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
                  + Add
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
              <div className={classes.imgContainer}>
                {dog.imageUrl ? (
                  <img className={classes.dogImg} src={dog.imageUrl} />
                ) : (
                  <PetsIcon color="disabled" style={{ fontSize: 100 }} />
                )}
              </div>
              <div>
                <h5>
                  {dog.dogName}&nbsp;
                  <IconButton
                    className={classes.editButton}
                    size="small"
                    onClick={() => {
                      setOpenEditDogModal(true);
                      setSelectedDogForEdit(dog);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className={classes.editButton}
                    size="small"
                    onClick={() => {
                      deleteDog(dog.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </h5>
                <p>
                  <PetsIcon
                    color="action"
                    style={{ fontSize: 15, color: "#89CFF0" }}
                  />{" "}
                  Breed: {dog.dogBreed}
                  <br />
                  <PetsIcon
                    color="action"
                    style={{ fontSize: 15, color: "#89CFF0" }}
                  />{" "}
                  Sex: {dog.dogSex}
                  <br />
                  <PetsIcon
                    color="action"
                    style={{ fontSize: 15, color: "#89CFF0" }}
                  />{" "}
                  Weight: {dog.dogWeight}lbs
                  <br />
                  <PetsIcon
                    color="action"
                    style={{ fontSize: 15, color: "#89CFF0" }}
                  />{" "}
                  Birth Date:{dog.dogBirthDate}
                  <br />
                  <PetsIcon
                    color="action"
                    style={{ fontSize: 15, color: "#89CFF0" }}
                  />{" "}
                  About: {dog.aboutDog}
                </p>
              </div>
              <Modal
                open={openEditDogModal}
                onClose={() => setOpenEditDogModal(false)}
              >
                <EditDogModal
                  dog={selectedDogForEdit}
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
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }
}
