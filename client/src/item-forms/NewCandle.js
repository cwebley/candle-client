import React from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  textField: {
    marginTop: "1em",
  },
  dialogContent: {
    display: "flex",
    flexFlow: "column nowrap",
  },
});

function NewCandle({
  values,
  editCandleIndex,
  isOpen,
  onClose,
  onChange,
  handleJarChange,
  handleWickChange,
  handleWickStickerChange,
  onAddCandle,
  onEditCandle,
  jarOptions = [],
  wickOptions = [],
  wickStickerOptions = [],
  classes,
}) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>New Candle</DialogTitle>
      <form onSubmit={editCandleIndex === null ? onAddCandle : onEditCandle}>
        <DialogContent className={classes.dialogContent}>
          <TextField
            className={classes.textField}
            autoFocus
            label="Name"
            value={values.name || ""}
            type="text"
            onChange={onChange}
            inputProps={{
              name: "name",
            }}
          />
          {/* <TextField
            className={classes.textField}
            label="Jar Hash Id"
            value={values.jarHashId || ""}
            type="text"
            onChange={onChange}
            inputProps={{
              name: "jarHashId",
              maxLength: 4,
            }}
          /> */}
          <Autocomplete
            autoHighlight
            autoSelect
            freeSolo
            options={jarOptions}
            getOptionLabel={(jarOption) => {
              if (jarOption.hashId) {
                return `${jarOption.hashId}-${jarOption.supplierName}-${jarOption.name}`;
              }
              return jarOption;
            }}
            value={values.jarHashId || ""}
            style={{ width: 300 }}
            onChange={handleJarChange}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  name: "jarHashId",
                }}
                label="Jar Hash Id"
              />
            )}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.jarFinished || false}
                onChange={onChange}
                name="jarFinished"
                color="primary"
              />
            }
            label="Finished"
          />
          {/* <TextField
            className={classes.textField}
            label="Wick Hash Id"
            value={values.wickHashId || ""}
            type="text"
            onChange={onChange}
            inputProps={{
              name: "wickHashId",
              maxLength: 4,
            }}
          /> */}
          <Autocomplete
            autoHighlight
            autoSelect
            freeSolo
            options={wickOptions}
            getOptionLabel={(wickOption) => {
              if (wickOption.hashId) {
                return `${wickOption.hashId}-${wickOption.supplierName}-${wickOption.name}`;
              }
              return wickOption;
            }}
            value={values.wickHashId || ""}
            style={{ width: 300 }}
            onChange={handleWickChange}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  name: "wickHashId",
                }}
                label="Wick Hash Id"
              />
            )}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.wickFinished || false}
                onChange={onChange}
                name="wickFinished"
                color="primary"
              />
            }
            label="Finished"
          />
          <TextField
            className={classes.textField}
            label="Wick Count"
            value={values.wickCount || ""}
            type="number"
            onChange={onChange}
            inputProps={{
              name: "wickCount",
              step: 1,
            }}
          />
          <TextField
            className={classes.textField}
            label="Wick Layout"
            value={values.wickLayout || ""}
            type="text"
            onChange={onChange}
            inputProps={{
              name: "wickLayout",
            }}
          />
          {/* <TextField
            className={classes.textField}
            label="Wick Sticker Hash Id"
            value={values.wickStickerHashId || ""}
            type="text"
            onChange={onChange}
            inputProps={{
              name: "wickStickerHashId",
              maxLength: 4,
            }}
          /> */}
          <Autocomplete
            autoHighlight
            autoSelect
            freeSolo
            options={wickStickerOptions}
            getOptionLabel={(wickStickerOption) => {
              if (wickStickerOption.hashId) {
                return `${wickStickerOption.hashId}-${wickStickerOption.name}`;
              }
              return wickStickerOption;
            }}
            value={values.wickStickerHashId || ""}
            style={{ width: 300 }}
            onChange={handleWickStickerChange}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  name: "wickStickerHashId",
                }}
                label="Wick Sticker Hash Id"
              />
            )}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.wickStickerFinished || false}
                onChange={onChange}
                name="wickStickerFinished"
                color="primary"
              />
            }
            label="Finished"
          />
          <TextField
            label="Notes"
            multiline
            value={values.notes || ""}
            className={classes.textField}
            margin="normal"
            inputProps={{
              name: "notes",
            }}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">
            {editCandleIndex === null ? "Add Candle" : "Edit Item"}
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default withStyles(styles)(NewCandle);
