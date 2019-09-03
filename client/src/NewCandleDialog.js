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

function NewCandleDialog({
  values,
  editCandleIndex,
  isOpen,
  onClose,
  onChange,
  onAddCandle,
  onEditCandle,
  classes
}) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>New Candle</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          className={classes.textField}
          label="Name"
          value={values.name || ""}
          type="text"
          onChange={onChange}
          inputProps={{
            name: "name"
          }}
        />
        <TextField
          className={classes.textField}
          label="Jar Hash Id"
          value={values.jarHashId || ""}
          type="text"
          onChange={onChange}
          inputProps={{
            name: "jarHashId",
            maxLength: 4
          }}
        />
        <TextField
          className={classes.textField}
          label="Lid Hash Id"
          value={values.lidHashId || ""}
          type="text"
          onChange={onChange}
          inputProps={{
            name: "lidHashId",
            maxLength: 4
          }}
        />
        <TextField
          className={classes.textField}
          label="Box Hash Id"
          value={values.boxHashId || ""}
          type="text"
          onChange={onChange}
          inputProps={{
            name: "boxHashId",
            maxLength: 4
          }}
        />
        <TextField
          className={classes.textField}
          label="Wick Hash Id"
          value={values.wickHashId || ""}
          type="text"
          onChange={onChange}
          inputProps={{
            name: "wickHashId",
            maxLength: 4
          }}
        />
        <TextField
          className={classes.textField}
          label="Wick Count"
          value={values.wickCount || ""}
          type="number"
          onChange={onChange}
          inputProps={{
            name: "wickCount",
            step: 1
          }}
        />
        <TextField
          className={classes.textField}
          label="Wick Layout"
          value={values.wickLayout || ""}
          type="text"
          onChange={onChange}
          inputProps={{
            name: "wickLayout"
          }}
        />
        <TextField
          className={classes.textField}
          label="Wick Sticker Hash Id"
          value={values.wickStickerHashId || ""}
          type="text"
          onChange={onChange}
          inputProps={{
            name: "wickStickerHashId",
            maxLength: 4
          }}
        />
        <TextField
          className={classes.textField}
          label="Warning Label Hash Id"
          value={values.warningLabelHashId || ""}
          type="text"
          onChange={onChange}
          inputProps={{
            name: "warningLabelHashId",
            maxLength: 4
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
          label="Prepped Jar Weight"
          value={values.preppedJarWeightOunces || ""}
          type="number"
          onChange={onChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">oz</InputAdornment>,
            inputProps: {
              name: "preppedJarWeightOunces",
              step: "0.01"
            }
          }}
        />
        <TextField
          className={classes.textField}
          label="Percent Overflow Poured"
          value={values.percentOverflowVolumePoured || ""}
          type="number"
          onChange={onChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
            inputProps: {
              name: "percentOverflowVolumePoured",
              step: "1",
              max: "100"
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={editCandleIndex !== null ? onEditCandle : onAddCandle}>
          {editCandleIndex === null ? "Add Item" : "Edit Item"}
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(NewCandleDialog);
