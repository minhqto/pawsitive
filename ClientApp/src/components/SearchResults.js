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
import { red } from "@material-ui/core/colors";

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
  //const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("/api/Specialist/allSpecialists").then((result) => {
      setUsers(result.data);
      props.parentCallback(result.data);
    });
  }, []);

  /*{
    users.forEach((user, index) => {
      items.push(<li key={index}>{user.name}</li>);
    });
  }*/

  const classes = useStyles();

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
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar className={classes.backColour}>{index + 1}</Avatar>
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
                        {console.log(users)}
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
