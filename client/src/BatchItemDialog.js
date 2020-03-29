import React, { useState, Fragment } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
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

function BatchItemDialog({
  values,
  combineOptions,
  editItemIndex,
  isOpen,
  onClose,
  onChange,
  onAddItem,
  onEditItem,
  itemTypes,
  waxWeightSuggestion,
  foWeightSuggestion,
  classes
}) {
  const [percentOfBlend, setPercentOfBlend] = useState(null);

  let weightInputProps = { name: "weightOunces", step: "0.01" };

  const getWeightPlaceholder = () => {
    const weightSuggestionValue =
      values.type === "wax" ? waxWeightSuggestion : foWeightSuggestion;
    if (!weightSuggestionValue) {
      return "";
    }

    const blendDecimal = parseFloat(percentOfBlend || 100) / 100;
    return (blendDecimal * weightSuggestionValue).toFixed(2);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (editItemIndex !== null) {
      onEditItem();
      return;
    }
    onAddItem();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>New Batch Item</DialogTitle>
      <form onSubmit={handleFormSubmit}>
        <DialogContent className={classes.dialogContent}>
          <FormControl>
            <InputLabel htmlFor="batch-item-type-selector">
              Item Type
            </InputLabel>
            <Select
              autoFocus
              value={values.type}
              onChange={onChange}
              inputProps={{
                name: "type",
                id: "batch-item-type-selector"
              }}
            >
              {itemTypes.map(t => (
                <MenuItem key={t.slug} value={t.slug}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={classes.textField}
            label="Hash Id"
            value={values.hashId || ""}
            required
            type="text"
            onChange={onChange}
            inputProps={{
              name: "hashId",
              maxLength: 4
            }}
          />
          {values.type === "dye-blocks" ? (
            <TextField
              className={classes.textField}
              label="Pieces"
              value={values.pieces || ""}
              type="number"
              required
              onChange={onChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Pieces</InputAdornment>
                ),
                inputProps: {
                  name: "pieces",
                  step: "0.01"
                }
              }}
            />
          ) : (
            <Fragment>
              <TextField
                className={classes.textField}
                label="% of blend"
                value={percentOfBlend || ""}
                type="number"
                onChange={e => {
                  const val = e.target.value;
                  setPercentOfBlend(val);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  )
                }}
              />
              <TextField
                className={classes.textField}
                label="Weight"
                value={values.weightOunces || ""}
                type="number"
                required
                onChange={onChange}
                placeholder={getWeightPlaceholder()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">oz</InputAdornment>
                  ),
                  inputProps: weightInputProps
                }}
              />
            </Fragment>
          )}
          {values.type && (
            <FormControl>
              <InputLabel htmlFor="combine-partner-selector">
                Combined Partner
              </InputLabel>
              <Select
                autoFocus
                value={values.combinedPartner || ""}
                onChange={onChange}
                inputProps={{
                  name: "combinedPartner",
                  id: "combine-partner-selector"
                }}
              >
                {combineOptions.filter(o => o.type === values.type).map(o => (
                  <MenuItem key={o.hashId} value={o.hashId}>
                    {o.hashId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={values.finished || false}
                onChange={onChange}
                name="finished"
                color="primary"
              />
            }
            label="Finished"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">
            {editItemIndex === null ? "Add Item" : "Edit Item"}
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default withStyles(styles)(BatchItemDialog);
