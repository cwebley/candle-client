import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap"
  },
  textField: {
    marginTop: "1em"
  },
  dialogContent: {
    display: "flex",
    flexFlow: "column nowrap"
  }
});

function NewLayer({
  values,
  editLayerIndex,
  isOpen,
  onClose,
  onChange,
  onAddLayer,
  onEditLayer,
  classes
}) {
  const handleAddLayer = e => {
    e.preventDefault(); // prevent the form submission and page reload
    onAddLayer(values);
  };

  const handleEditLayer = e => {
    e.preventDefault(); // prevent the form submission and page reload
    onEditLayer(values);
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>New Layer</DialogTitle>
      <form
        onSubmit={editLayerIndex === null ? handleAddLayer : handleEditLayer}
      >
        <DialogContent className={classes.dialogContent}>
          <TextField
            className={classes.textField}
            label="When Poured"
            value={values.whenPoured || ""}
            type="datetime-local"
            onChange={onChange}
            inputProps={{
              name: "whenPoured",
              step: "1"
            }}
          />
          <TextField
            className={classes.textField}
            label="Candle Hash Id"
            autoFocus
            value={values.candleHashId || ""}
            type="text"
            onChange={onChange}
            inputProps={{
              name: "candleHashId",
              maxLength: 4
            }}
          />
          <TextField
            className={classes.textField}
            label="Prepped Container Weight"
            value={values.preppedContainerWeightOunces || ""}
            type="number"
            onChange={onChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">oz</InputAdornment>,
              inputProps: {
                name: "preppedContainerWeightOunces",
                step: "1"
              }
            }}
          />
          <TextField
            className={classes.textField}
            label="Container Temperature"
            value={values.containerTemperatureFahrenheit || ""}
            type="number"
            onChange={onChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">°F</InputAdornment>,
              inputProps: {
                name: "containerTemperatureFahrenheit",
                step: "1"
              }
            }}
          />
          <TextField
            className={classes.textField}
            label="Pour Temperature"
            value={values.pourTemperatureFahrenheit || ""}
            type="number"
            onChange={onChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">°F</InputAdornment>,
              inputProps: {
                name: "pourTemperatureFahrenheit",
                step: "1"
              }
            }}
          />
          <TextField
            className={classes.textField}
            label="Cooling Room Temperature"
            value={values.coolingRoomTemperatureFahrenheit || ""}
            type="number"
            onChange={onChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">°F</InputAdornment>,
              inputProps: {
                name: "coolingRoomTemperatureFahrenheit",
                step: "1"
              }
            }}
          />
          <TextField
            className={classes.textField}
            label="Cooling Room Humidity"
            value={values.coolingRoomHumidityPercent || ""}
            type="number"
            onChange={onChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              inputProps: {
                name: "coolingRoomHumidityPercent",
                step: "1"
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">
            {editLayerIndex === null ? "Add Layer" : "Edit Layer"}
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default withStyles(styles)(NewLayer);
