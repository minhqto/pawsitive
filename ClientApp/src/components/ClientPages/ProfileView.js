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
import AddDogModal from "./AddDogModal";
import EditDogModal from "./EditDogModal";

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
              <div>
                <h4>{dog.dogName}</h4>
                <br></br>
                <p>{dog.aboutDog}</p>
              </div>

              <Button
                className={classes.editButton}
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  setOpenEditDogModal(true);
                  setSelectedDogForEdit(dog);
                }}
              >
                Edit
              </Button>

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
    return <h1>Loading...</h1>;
  }
}
