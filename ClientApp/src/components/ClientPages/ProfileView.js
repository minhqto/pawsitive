import React, { useEffect, useState } from "react";
import { Container, Box, Grid, Button, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

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
}));

export default function ProfileView() {
  const classes = useStyles();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isAuthorized, setAuthorized] = useState(false);
  let { routeId } = useParams();

  useEffect(() => {
    console.log(routeId);
    console.log(user.id);
    if (isAuthenticated && user.id === routeId) {
      console.log("hit here");
      setAuthorized(true);
    }
  }, [user]);

  let clientInfo = {
    img: `http://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture-1024x1024.jpg`,
    name: `Angolina Jolie`,
    address: `123, Toronto, ON`,
    description: `Hi, I am a dog lover`,
    dogs: [
      {
        img: `http://cdn.akc.org/content/article-body-image/samoyed_puppy_dog_pictures.jpg`,
        name: `Fluffy`,
      },
      {
        img: `https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg`,
        name: `Bella`,
      },
    ],
  };

  return (
    <Container>
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
      >
        <div className={classes.imgContainer}>
          <img className={classes.clientImg} src={clientInfo.img} />
        </div>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <div className={classes.clientName}>{clientInfo.name} </div>
          <div className={classes.clientAddress}>{clientInfo.address}</div>
          <div className={classes.clientBio}>{clientInfo.description}</div>
        </Box>
        {isAuthorized && (
          <Button
            className={classes.editButton}
            size="small"
            variant="outlined"
            color="primary"
          >
            Edit
          </Button>
        )}
      </Box>

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
              >
                Add
              </Button>
            )}
          </h3>
        </Grid>
        {clientInfo.dogs.map((dog, index) => (
          <Grid key={index} className={classes.dogItem} item xs={6}>
            <img className={classes.dogImg} src={dog.img} />
            <div className={classes.dogInfo}>{dog.name}</div>
            {isAuthorized && (
              <Button
                className={classes.editButton}
                size="small"
                variant="outlined"
                color="primary"
              >
                Edit
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
