import React, { Component, useEffect, useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  size: { width: "100%", height: "100%" },
}));

const Map = () => {
  const [map, setMap] = useState("");
  useEffect(() => {
    axios.get("https://localhost:5001/api/Map/map").then((result) => {
      setMap(result.data.message);
    });
  }, []);

  const classes = makeStyles();
  return (
    <div className={classes.size}>
      <iframe
        width="600"
        height="450"
        loading="lazy"
        allowFullScreen
        src={map}
      ></iframe>
    </div>
  );
};

export default Map;
