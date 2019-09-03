import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: { display: "flex" },
  dataLabel: {
    flexBasis: "40%",
    paddingRight: theme.spacing(2),
    "&:after": {
      content: '":"'
    }
  },
  dataValue: {
    flexGrow: 1
  }
});

const DataLabel = ({
  label,
  name,
  value,
  unit,
  editable,
  multiline,
  onChange,
  autoFocus,
  classes
}) => {
  return (
    <li className={classes.root}>
      <Typography className={classes.dataLabel} variant="subtitle1">
        {label}
      </Typography>
      {editable ? (
        <TextField
          value={value}
          className={classes.dataValue}
          margin="none"
          autoFocus={autoFocus}
          type={unit ? "number" : "text"}
          multiline={multiline}
          InputProps={
            unit && {
              endAdornment: (
                <InputAdornment position="end">{unit}</InputAdornment>
              ),
              inputProps: {
                name,
                step: "0.1"
              }
            }
          }
          inputProps={
            !unit
              ? {
                  name
                }
              : {}
          }
          onChange={onChange}
        />
      ) : (
        <Typography className={classes.dataValue} variant="subtitle1">
          {`${value}${unit ? ` ${unit}` : ""}`}
        </Typography>
      )}
    </li>
  );
};

export default withStyles(styles)(DataLabel);
