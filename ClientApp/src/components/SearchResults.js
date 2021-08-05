import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
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
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const classes = useStyles();
  const history = useHistory();
  var test = [];
  //const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("/api/Specialist/allSpecialists").then((result) => {
      setUsers(result.data);
      props.parentCallback(result.data);
    });
  }, []);

  const handleListItemClick = (userId) => {
    history.push(`/specialistServicePage/${userId}`);
  };

  const ShowNoResult = function () {
    return users.filter((user) =>
      user.address.city
        .toLowerCase()
        .includes(document.getElementById("search").value.toLocaleLowerCase())
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

  return (
    <div>
      <Paper component="form" className={classes.root}>
        <InputBase
          id="search"
          className={classes.input}
          placeholder="Enter a city name"
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={() => {
<<<<<<< Updated upstream
            setSearchTerm(document.getElementById("search").value);
=======
            //if (localStorage.getItem("permissionDenied") == "true") {
            setUsers(axResult);
            //}
            if (localStorage.getItem("permissionDenied") == "false") {
              
              var searchResult = axResult.find((user) =>
              user.address.city
                .toLowerCase()
                .includes(tempSearchValue.toLowerCase())
            ) == undefined ? ;
              
              setSearchTerm(
                axResult.find((user) =>
                  user.address.city
                    .toLowerCase()
                    .includes(tempSearchValue.toLowerCase())
                ).address.city
              );
            } else {
              setSearchTerm(tempSearchValue);
            }
>>>>>>> Stashed changes
            loadMap(
              (test = axResult.filter((user) =>
                user.address.city
                  .toLowerCase()
                  .includes(
                    document.getElementById("search").value.toLocaleLowerCase()
                  )
              ))
            );
            if (test.length == 0) {
              ShowNoResult(false);
            } else {
              ShowNoResult(true);
            }
          }}
        >
          <SearchIcon />
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
              <div>
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
                            {user.firstName + " " + user.lastName}
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
                              (element) => {
                                return (
                                  <Chip
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
