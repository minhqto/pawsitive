import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Map from "./Map";
import SearchResults from "./SearchResults";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  map: {
    width: "100%",
    height: "100vh",
  },
}));

const Main = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResultData = (searchResults) => {
    setSearchResults(searchResults);
  };

  const classes = useStyles();

  return (
    <Grid container spacing={0}>
      <Grid item lg={4}>
        <SearchResults parentCallback={handleSearchResultData} />
      </Grid>
      <Grid item lg={8}>
        <div>
          {searchResults != null ? (
            <Map className={classes.map} user={searchResults} />
          ) : (
            <div>loading...</div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Main;
