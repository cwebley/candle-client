import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
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
});

function JarForm({
  newItemValues,
  itemOptions = [],
  onChange,
  onComboboxChange,
  classes,
}) {
  return (
    <div className={classes.root}>
      <Autocomplete
        autoHighlight
        autoSelect
        freeSolo
        options={itemOptions}
        getOptionLabel={(option) => {
          if (!option.name) {
            return option;
          }
          return option.name;
        }}
        value={newItemValues.name || ""}
        style={{ width: 300 }}
        onChange={onComboboxChange}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{ ...params.InputProps, name: "name" }}
            label="Name"
          />
        )}
      />

      <TextField
        className={classes.textField}
        label="Product Link"
        disabled={!!newItemValues.referenceId}
        value={newItemValues.productUrl || ""}
        type="text"
        onChange={onChange}
        inputProps={{
          name: "productUrl",
        }}
      />
      <TextField
        className={classes.textField}
        label="MSDS Link"
        disabled={!!newItemValues.referenceId}
        value={newItemValues.msdsUrl || ""}
        type="text"
        onChange={onChange}
        inputProps={{
          name: "msdsUrl",
        }}
      />
      <TextField
        className={classes.textField}
        label="Info Link"
        disabled={!!newItemValues.referenceId}
        value={newItemValues.infoUrl || ""}
        type="text"
        onChange={onChange}
        inputProps={{
          name: "infoUrl",
        }}
      />
      <TextField
        className={classes.textField}
        label="Wax to fill line"
        value={newItemValues.waxToFillLineOunces || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">oz</InputAdornment>,
          inputProps: {
            name: "waxToFillLineOunces",
            step: "0.01",
          },
        }}
      />
      <TextField
        className={classes.textField}
        label="Wax to overflow"
        value={newItemValues.waxToOverflowOunces || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">oz</InputAdornment>,
          inputProps: {
            name: "waxToOverflowOunces",
            step: "0.01",
          },
        }}
      />
      <TextField
        className={classes.textField}
        label="Overflow Volume"
        value={newItemValues.overflowVolumeOunces || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">fl.oz</InputAdornment>,
          inputProps: {
            name: "overflowVolumeOunces",
            step: "0.01",
          },
        }}
      />
      <TextField
        className={classes.textField}
        label="Diameter"
        value={newItemValues.diameterInches || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">inches</InputAdornment>,
          inputProps: {
            name: "diameterInches",
            step: "0.01",
          },
        }}
      />
      <TextField
        className={classes.textField}
        label="Color"
        value={newItemValues.color || ""}
        type="text"
        inputProps={{
          name: "color",
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
          step: "1",
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
          step: "1",
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
            step: "0.01",
          },
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
            step: "0.1",
          },
        }}
      />
      <TextField
        label="Notes"
        multiline
        value={newItemValues.notes || ""}
        className={classes.textField}
        margin="normal"
        inputProps={{
          name: "notes",
        }}
        onChange={onChange}
      />
    </div>
  );
}

export default withStyles(styles)(JarForm);
