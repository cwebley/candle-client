import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { DateTimePicker } from "material-ui-pickers";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  pickerContainer: {
    padding: `0 ${theme.spacing(2)}px`,
    textAlign: "center"
  },
  picker: {
    textAlign: "right"
  },
  buttonWrapper: {
    textAlign: "center",
    paddingTop: theme.spacing(2)
  }
});

const BurnTimePicker = ({ onSubmit, onClose, isOpen, classes }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(moment());
  const [selectedStopDate, setSelectedStopDate] = useState(moment());

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(selectedStartDate, selectedStopDate);
    setSelectedStartDate(moment());
    setSelectedStopDate(moment());
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>New Burn</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className={classes.dialogContent}>
          <DateTimePicker
            value={selectedStartDate}
            onChange={setSelectedStartDate}
            className={classes.picker}
            label="Burn Start"
          />
          <DateTimePicker
            value={selectedStopDate}
            onChange={setSelectedStopDate}
            className={classes.picker}
            label="Burn End"
          />
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

/*

<Grid container justify="center">
  <Grid item className={classes.pickerContainer} xs={12} sm={6}>
    <DateTimePicker
      value={selectedStartDate}
      onChange={setSelectedStartDate}
      className={classes.picker}
      label="Burn Start"
    />
  </Grid>

  <Grid item className={classes.pickerContainer} xs={12} sm={6}>
    <DateTimePicker
      value={selectedStopDate}
      onChange={setSelectedStopDate}
      className={classes.picker}
      label="Burn End"
    />
  </Grid>

  <Grid item xs={10} className={classes.buttonWrapper}>
    <Button
      color="primary"
      disabled={!selectedStartDate || !selectedStopDate}
      onClick={() => onLogBurn(selectedStartDate, selectedStopDate)}
    >
      Log Burn
    </Button>
  </Grid>
</Grid>
*/
