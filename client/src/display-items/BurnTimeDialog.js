import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { DateTimePicker } from "@material-ui/pickers";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  pickerContainer: {
    textAlign: "center",
  },
  picker: {
    display: "flex",
    padding: `0 ${theme.spacing(2)}px`,
  },
  buttonWrapper: {
    textAlign: "center",
    paddingTop: theme.spacing(2),
  },
  formField: {
    display: "flex",
    margin: theme.spacing(2),
  },
});

// tag each burn with a unique int id for react display purposes
let pendingBurnCount = 0;

const BurnTimePicker = ({ onSubmit, onClose, isOpen, classes }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(moment());
  const [selectedStopDate, setSelectedStopDate] = useState(moment());
  const [notes, setNotes] = useState("");
  const [stoppedWeightOunces, setStoppedWeightOunces] = useState(null);
  const [finished, setFinished] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    pendingBurnCount++

    onSubmit({
      id: pendingBurnCount,
      whenStarted: selectedStartDate,
      whenStopped: selectedStopDate,
      stoppedWeightOunces,
      finished,
      notes,
    });

    // reset the date pickers
    setSelectedStartDate(moment());
    setSelectedStopDate(moment());
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>New Burn</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className={classes.dialogContent}>
          <Grid container>
            <Grid item xs={6}>
              <DateTimePicker
                value={selectedStartDate}
                onChange={setSelectedStartDate}
                className={classes.picker}
                label="Burn Start"
              />
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker
                value={selectedStopDate}
                onChange={setSelectedStopDate}
                className={classes.picker}
                label="Burn End"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.formField}
                label="Weight After Burn"
                value={stoppedWeightOunces || ""}
                type="number"
                onChange={(e) => {
                  const value = e.target.value;
                  setStoppedWeightOunces(parseFloat(value));
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">oz</InputAdornment>
                  ),
                  inputProps: {
                    name: "stoppedWeightOunces",
                    step: "0.1",
                    max: "250",
                    min: "0",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                className={classes.formField}
                control={
                  <Checkbox
                    checked={finished}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFinished(checked);
                    }}
                    name="finished"
                    color="primary"
                  />
                }
                label="Finished"
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Notes"
                multiline
                value={notes}
                className={classes.formField}
                margin="normal"
                inputProps={{
                  name: "notes",
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  setNotes(value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button color="primary" type="submit">
            Add Burn
          </Button>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default withStyles(styles)(BurnTimePicker);
