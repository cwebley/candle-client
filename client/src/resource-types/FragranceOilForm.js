import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap"
  },
  textField: {
    marginTop: "1em"
  },
  formControl: {
    marginTop: "1em"
  }
});

function FragranceOilForm({ categories, newItemValues, onChange, classes }) {
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
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="oil-category">Category</InputLabel>
        <Select
          value={newItemValues.category}
          onChange={onChange}
          inputProps={{
            name: "category",
            id: "oil-category"
          }}
        >
          {categories.map(c => (
            <MenuItem key={c.slug} value={c.slug}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
            step: "0.01"
          }
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
            step: "0.01"
          }
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

export default withStyles(styles)(FragranceOilForm);
