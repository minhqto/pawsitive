import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { loadMap } from "./Map";
import PetsIcon from "@material-ui/icons/Pets";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "95%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  rootList: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  backColour: {
    backgroundColor: "red",
  },
  chip: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.2),
    },
  },
}));

const SearchResults = (props) => {
  const [axResult, setAxResult] = useState("");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState("");
  const classes = useStyles();
  const history = useHistory();
  var permissionDenied = true;
  var permissionLat = 0;
  var permissionLng = 0;
  var test = [];
  //const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("/api/Specialist/allSpecialists").then((result) => {
      if (
        localStorage.getItem("permissionDenied") != null &&
        localStorage.getItem("permissionDenied") == "false"
      ) {
        localStorage.getItem("city") != null &&
          setUsers(
            result.data.filter((user) =>
              localStorage
                .getItem("city")
                .toLocaleLowerCase()
                .includes(user.address.city.toLowerCase())
            )
          );
      }

      setUsers(result.data);
      setAxResult(result.data);
      getLocation(result.data);
      props.parentCallback(result.data);
    });
  }, []);

  const handleListItemClick = (userId) => {
    history.push(`/specialistServicePage/${userId}`);
  };

  const ShowNoResult = function () {
    return users.filter((user) =>
      user.address.city.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    ).length == 0 ? (
      <h4 id="no_value">
        <br />
        <PetsIcon
          color="action"
          style={{ fontSize: 30, color: "#89CFF0" }}
        />{" "}
        Oops...No results found!
      </h4>
    ) : (
      <h4 id="no_value" style={{ display: "none" }}>
        <br />
        <PetsIcon
          color="action"
          style={{ fontSize: 30, color: "#89CFF0" }}
        />{" "}
        Oops...No results found!
      </h4>
    );
  };

  function getLocation(users) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => showPosition(position, users),
        (error) => errorCallback(error, users)
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position, users) {
    localStorage.setItem("permissionLat", position.coords.latitude);
    localStorage.setItem("permissionLng", position.coords.longitude);
    localStorage.setItem("permissionDenied", false);
    permissionLat = position.coords.latitude;
    permissionLng = position.coords.longitude;
    permissionDenied = false;
    reverseGeocoding(
      position.coords.latitude,
      position.coords.longitude,
      users
    );
  }

  function errorCallback(error, users) {
    if (error.code == error.PERMISSION_DENIED) {
      localStorage.setItem("permissionDenied", true);
      localStorage.removeItem("permissionLat");
      localStorage.removeItem("permissionLng");
      permissionDenied = true;
      loadMap(users, permissionDenied, permissionLat, permissionLng);
    } else {
      console.log(error);
    }
  }

  function reverseGeocoding(lat, lng, users) {
    var options = {
      method: "GET",
      url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse",
      params: {
        lat: lat,
        lon: lng,
        "accept-language": "en",
        polygon_threshold: "0.0",
      },
      headers: {
        "x-rapidapi-key": "b45077c411msh3b11fddee5a5e95p114864jsn3d68c616da31",
        "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        localStorage.setItem("city", response.data.address.city.toString());
        setSearchTerm(
          users.find((user) =>
            response.data.address.city
              .toLowerCase()
              .toString()
              .includes(user.address.city.toLowerCase())
          ) == undefined
            ? response.data.address.city
            : users.find((user) =>
                response.data.address.city
                  .toLowerCase()
                  .toString()
                  .includes(user.address.city.toLowerCase())
              ).address.city
        );
        loadMap(
          users,
          permissionDenied,
          permissionLat,
          permissionLng,
          null,
          response.data.address.city.toString()
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const onSearchEnter = () => {
    if (localStorage.getItem("permissionDenied") == "false") {
      /*var searchResult = axResult.find((user) =>
      user.address.city
        .toLowerCase()
        .includes(tempSearchValue.toLowerCase())
    ) == undefined ? ;*/

      setSearchTerm(
        axResult.find((user) =>
          user.address.city
            .toLowerCase()
            .includes(tempSearchValue.toLowerCase())
        ) == undefined
          ? tempSearchValue
          : axResult.find((user) =>
              user.address.city
                .toLowerCase()
                .includes(tempSearchValue.toLowerCase())
            ).address.city
      );
    } else {
      setSearchTerm(tempSearchValue);
    }
    loadMap(
      (test = axResult.filter((user) =>
        user.address.city
          .toLowerCase()
          .includes(tempSearchValue.toLocaleLowerCase())
      )),
      null,
      null,
      null,
      tempSearchValue != ""
    );
  };

  return (
    <div>
      <Paper
        component="form"
        className={classes.root}
        onSubmit={(e) => {
          e.preventDefault();
          onSearchEnter();
        }}
      >
        <InputBase
          id="search"
          onChange={(event) => {
            setTempSearchValue(event.target.value);
          }}
          className={classes.input}
          placeholder="Enter a city name"
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={() => {
            onSearchEnter();
          }}
        >
          <LocationSearchingIcon />
        </IconButton>
      </Paper>
      <br />
      <h2>Search Results</h2>
      <ShowNoResult />
      {users.length != 0 ? (
        users
          .filter((user) => {
            if (searchTerm == "") return user;
            else
              return user.address.city
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase());
          })
          .map(function (user, index) {
            return (
              <div key={index}>
                <List className={classes.rootList}>
                  <ListItem
                    button
                    alignItems="flex-start"
                    onClick={() => {
                      handleListItemClick(user.id);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={
                          user.imageUrl == null
                            ? "https://joeschmoe.io/api/v1/random"
                            : user.imageUrl
                        }
                        className={classes.backColour}
                      >
                        {index + 1}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {user.firstName +
                              " " +
                              user.lastName +
                              " - " +
                              (index + 1)}
                          </Typography>
                          <br></br>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            {user.address.streetAddress}
                          </Typography>
                          <br></br>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            {user.address.city}
                          </Typography>
                          <br></br>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            {user.email}
                          </Typography>
                          <br></br>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            {user.phoneNumber}
                          </Typography>
                          <br></br>
                          <div className={classes.chip}>
                            {user.specialistProfile.serviceTypes.map(
                              (element, index) => {
                                return (
                                  <Chip
                                    key={index}
                                    size="small"
                                    color="primary"
                                    label={
                                      element.serviceTypeName
                                        .charAt(0)
                                        .toUpperCase() +
                                      element.serviceTypeName.slice(1)
                                    }
                                  />
                                );
                              }
                            )}
                          </div>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              </div>
            );
          })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SearchResults;
