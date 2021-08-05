import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: "0km",
  },
  {
    value: 100,
    label: "100km",
  },
];

function valuetext(value) {
  return `{value}km`;
}

const DistanceSlider = ({ setValue, defaultValue }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        Visit Distance
      </Typography>
      <Slider
        onChange={(e, val) => setValue(val)}
        defaultValue={defaultValue ? defaultValue : 20}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        //Will be abled only when 'ProvideHomeVisitService' is True
        disabled={false}
      />
    </div>
  );
};

export default DistanceSlider;
