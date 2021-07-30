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
}));

const SearchResults = (props) => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  const history = useHistory();
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

  return (
    <div>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <br />
      <h2>Search Results</h2>
      {users.length != 0 ? (
        users.map(function (user, index) {
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
                        {user.specialistProfile.services.forEach((element) => {
                          return <Chip label={element} />;
                        })}
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
