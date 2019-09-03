import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap"
  },
  textField: {
    marginTop: "1em"
  }
});

function WarningLabelForm({ newItemValues, onChange, classes }) {
  return (
    <div className={classes.root}>
      <TextField
        className={classes.textField}
        label="Name"
        autoFocus
        required
        value={newItemValues.name || ""}
        type="text"
        inputProps={{
          name: "name"
        }}
        onChange={onChange}
      />
      <TextField
        className={classes.textField}
        label="Color"
        value={newItemValues.color || ""}
        type="text"
        inputProps={{
          name: "color"
        }}
        onChange={onChange}
      />
      <TextField
        className={classes.textField}
        label="Count"
        value={newItemValues.count || ""}
        type="number"
        inputProps={{
          name: "count",
          step: "1"
        }}
        onChange={onChange}
      />
      <TextField
        className={classes.textField}
        label="Remaining"
        value={newItemValues.remaining || ""}
        type="number"
        inputProps={{
          name: "remaining",
          step: "1"
        }}
        onChange={onChange}
      />
      <TextField
        className={classes.textField}
        label="Price"
        value={newItemValues.price || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          inputProps: {
            name: "price",
            step: "0.01"
          }
        }}
      />
      <TextField
        className={classes.textField}
        label="Share of Shipping"
        value={newItemValues.shareOfShippingPercent || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
          inputProps: {
            name: "shareOfShippingPercent",
            step: "0.1"
          }
        }}
      />
      <TextField
        label="Notes"
        multiline
        value={newItemValues.notes || ""}
        className={classes.textField}
        margin="normal"
        inputProps={{
          name: "notes"
        }}
        onChange={onChange}
      />
    </div>
  );
}

export default withStyles(styles)(WarningLabelForm);
