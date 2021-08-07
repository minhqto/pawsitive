import React, { useState } from "react";
import {
  Grid,
  Button,
  makeStyles,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

// import MUIRichTextEditor from "mui-rte";
// import { convertToRaw, convertFromRaw } from "draft-js";
// import { convertToHTML } from "draft-convert";
import axios from "axios";

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

const EditClientModal = ({ cancelClick, clientProfile }) => {
  const { firstName, lastName, phoneNumber, email, imageUrl, id } =
    clientProfile.client;
  const { country, city, streetAddress, province, postalCode } =
    clientProfile.client.address;
  const { aboutMe } = clientProfile;

  const classes = useStyles();
  const [clientObj, setClientObj] = useState({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
    imageUrl: imageUrl,
    country: "Canada",
    city: city,
    street: streetAddress,
    province: province,
    postalCode: postalCode,
    aboutMe: aboutMe,
  });

  // We use this for rich text, will deal with it later when we have time
  // const getAboutMe = (state) => {
  //   const rteContent = convertToRaw(state.getCurrentContent());
  //   setClientObj({ ...clientObj, aboutMe: JSON.stringify(rteContent) });

  //   // How to convert state to HTML, for future display purpose
  //   // let contentState = convertFromRaw(JSON.parse(jsonRte)); // convert json string to content state object
  //   // let html = convertToHTML(contentState); // convert content state object to html
  //   // console.log(html); // display the html
  // };

  const updateClientInfo = () => {
    console.log(clientObj);

    // make api call to update client information
    axios
      .put(`/api/Client/clientDetail/${id}`, clientObj)
      .then((res) => {
        alert("Information updated successfully! Reloading...");
        window.location.reload();
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Edit your profile</h1>
        </Grid>
        <hr></hr>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="First Name"
            defaultValue={firstName}
            variant="outlined"
            onChange={(e) =>
              setClientObj({
                ...clientObj,
                firstName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Last Name"
            defaultValue={lastName}
            variant="outlined"
            onChange={(e) =>
              setClientObj({
                ...clientObj,
                lastName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Phone Number"
            defaultValue={phoneNumber}
            variant="outlined"
            onChange={(e) =>
              setClientObj({
                ...clientObj,
                phoneNumber: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Email"
            defaultValue={email}
            variant="outlined"
            InputLabelProps={{ required: true }}
            onChange={(e) =>
              setClientObj({
                ...clientObj,
                email: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth={true}
            label="Profile Image URL"
            defaultValue={imageUrl}
            variant="outlined"
            onChange={(e) =>
              setClientObj({
                ...clientObj,
                imageUrl: e.target.value,
              })
            }
          />
        </Grid>


        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            label="Street Address"
            defaultValue={streetAddress}
            variant="outlined"
            onChange={(e) =>
              setClientObj({
                ...clientObj,
                street: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="City"
            defaultValue={city}
            variant="outlined"
            onChange={(e) =>
              setClientObj({
                ...clientObj,
                city: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="Province"
            defaultValue={province}
            variant="outlined"
            onChange={(e) =>
              setClientObj({
                ...clientObj,
                province: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth={true}
            label="Postal Code"
            defaultValue={postalCode}
            variant="outlined"
            onChange={(e) =>
              setClientObj({
                ...clientObj,
                postalCode: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <h3>About Me</h3>
          {/* <MUIRichTextEditor
            // defaultValue={aboutMe}
            label="Tell us about yourself!"
            onChange={getAboutMe}
          /> */}

          <TextareaAutosize
            rowsMin={3}
            style={{ width: "100%" }}
            placeholder="About me"
            defaultValue={aboutMe}
            onChange={(e) =>
              setClientObj({
                ...clientObj,
                aboutMe: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            onClick={cancelClick}
            variant="contained">
            Cancel
          </Button>
          <Button
            style={{ marginLeft: "20px" }}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={updateClientInfo}>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditClientModal;
