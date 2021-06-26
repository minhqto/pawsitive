import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Map from "./Map";

const useStyles = makeStyles((theme) => ({
  map: {
    width: "100%",
    height: "100vh",
  },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <div>
      <div>Hello world</div>
      <div>
        <Map className={classes.map} />
      </div>
    </div>
  );
};

export default Main;
