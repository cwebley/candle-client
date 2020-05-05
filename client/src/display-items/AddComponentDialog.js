import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  dialogContent: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 225,
  },
  formField: {
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
  },
  checkboxContainer: {
    textAlign: "right",
  },
});

const AddComponentDialog = ({ onSubmit, onClose, isOpen, classes }) => {
  const [itemType, setItemType] = useState("");
  const [hashId, setHashId] = useState("");
  const [finished, setFinished] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      itemType,
      hashId,
      finished,
    });

    // reset the date fields
    setItemType("lidHashId");
    setHashId("");
    setFinished(false);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Candle Component</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className={classes.dialogContent}>
          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="item-type-selector">Item Type</InputLabel>
                <Select
                  value={itemType}
                  onChange={(e) => {
                    const value = e.target.value;
                    setItemType(e.target.value);
                  }}
                  autoFocus
                  inputProps={{
                    name: "type",
                    id: "item-type-selector",
                  }}
                >
                  <MenuItem value="lidHashId">Lid Hash Id</MenuItem>
                  <MenuItem value="boxHashId">Box Hash Id</MenuItem>
                  <MenuItem value="warningLabelHashId">
                    Warning Label Hash Id
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="hashId"
                value={hashId}
                className={classes.textField}
                type="text"
                inputProps={{ name: "hashId", maxLength: 4 }}
                onChange={(e) => {
                  const value = e.target.value;
                  setHashId(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.checkboxContainer}>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" type="submit">
            Confirm
          </Button>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default withStyles(styles)(AddComponentDialog);
