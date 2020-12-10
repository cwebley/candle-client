import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Autocomplete from "@material-ui/lab/Autocomplete";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  textField: {
    marginTop: "1em",
  },
  formControl: {
    marginTop: "1em",
  },
});

function FragranceOilForm({
  categories,
  itemOptions = [],
  newItemValues,
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
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="oil-category">Category</InputLabel>
        <Select
          value={newItemValues.categoryId || ""}
          disabled={!!newItemValues.referenceId}
          onChange={onChange}
          inputProps={{
            name: "categoryId",
            id: "oil-category",
          }}
        >
          {categories.map((c) => (
            <MenuItem key={c.slug} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
        label="IFRA Link"
        disabled={!!newItemValues.referenceId}
        value={newItemValues.ifraUrl || ""}
        type="text"
        onChange={onChange}
        inputProps={{
          name: "ifraUrl",
        }}
      />
      <TextField
        className={classes.textField}
        label="Allergin Link"
        disabled={!!newItemValues.referenceId}
        value={newItemValues.allerginUrl || ""}
        type="text"
        onChange={onChange}
        inputProps={{
          name: "allerginUrl",
        }}
      />
      <TextField
        className={classes.textField}
        label="Flashpoint"
        disabled={!!newItemValues.referenceId}
        value={newItemValues.flashpointTemperatureFahrenheit || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">°F</InputAdornment>,
          inputProps: {
            name: "flashpointTemperatureFahrenheit",
            step: "0.1",
          },
        }}
      />
      <TextField
        className={classes.textField}
        label="Specific Gravity"
        disabled={!!newItemValues.referenceId}
        value={newItemValues.specificGravity || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">units</InputAdornment>,
          inputProps: {
            name: "specificGravity",
            step: "0.01",
          },
        }}
      />
      <TextField
        className={classes.textField}
        label="Vanillin Percentage"
        disabled={!!newItemValues.referenceId}
        value={newItemValues.vanillinPercentage || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
          inputProps: {
            name: "vanillinPercentage",
            step: "0.01",
            max: "100",
          },
        }}
      />
      <TextField
        className={classes.textField}
        label="Ethyl Vanillin Percentage"
        disabled={!!newItemValues.referenceId}
        value={newItemValues.ethylVanillinPercentage || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
          inputProps: {
            name: "ethylVanillinPercentage",
            step: "0.01",
            max: "100",
          },
        }}
      />
      <TextField
        className={classes.textField}
        label="Weight"
        value={newItemValues.weightOunces || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">oz</InputAdornment>,
          inputProps: {
            name: "weightOunces",
            step: "0.01",
          },
        }}
      />
      <TextField
        className={classes.textField}
        label="Remaining"
        value={newItemValues.remaining || ""}
        type="number"
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">oz</InputAdornment>,
          inputProps: {
            name: "remaining",
            step: "0.01",
          },
        }}
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
            max: "100",
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

export default withStyles(styles)(FragranceOilForm);
