import React, { useState, Fragment } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
  onAutocompleteSelection,
  waxHashIdOptions,
  additiveHashIdOptions,
  fragranceOilHashIdOptions,
  blendHashIdOptions,
  dyeHashIdOptions,
  classes,
}) {
  const [percentOfBlend, setPercentOfBlend] = useState(null);

  let weightInputProps = { name: "weightOunces", step: "0.01" };

  let autocompleteOptions;
  if (values.type === "wax") {
    autocompleteOptions = waxHashIdOptions;
  }
  if (values.type === "additive") {
    autocompleteOptions = additiveHashIdOptions;
  }
  if (values.type === "fragrance-oil") {
    autocompleteOptions = fragranceOilHashIdOptions;
  }
  if (values.type === "blend") {
    autocompleteOptions = blendHashIdOptions;
  }
  if (values.type === "dye") {
    autocompleteOptions = dyeHashIdOptions;
  }

  const getWeightPlaceholder = () => {
    let weightSuggestionValue = 0;

    if (
      values.type === "wax" ||
      values.type === "blend" ||
      values.type === "additive"
    ) {
      weightSuggestionValue = waxWeightSuggestion;
    }
    if (values.type === "fragrance-oil") {
      weightSuggestionValue = foWeightSuggestion;
    }

    const blendDecimal = parseFloat(percentOfBlend || 100) / 100;
    weightSuggestionValue = blendDecimal * weightSuggestionValue;
    console.log("WEIGHT SUGGESTION VAL: ", weightSuggestionValue);

    if (values.combineId) {
      const currentWeightForCombination = combineOptions
        .map((o) =>
          o.combineId === values.combineId && o.hashId !== values.hashId
            ? parseFloat(o.weightOunces)
            : 0
        )
        .reduce((acc, val) => (acc += val), 0);

      weightSuggestionValue =
        weightSuggestionValue - currentWeightForCombination;
    }
    if (isNaN(weightSuggestionValue)) {
      return "";
    }
    return weightSuggestionValue.toFixed(2);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editItemIndex !== null) {
      onEditItem();
      return;
    }
    onAddItem();
  };

  const filteredCombineOptions = combineOptions
    .filter((o) => o.type === values.type && o.hashId !== values.hashId)
    .map((o) => ({
      name: o.hashId,
      value: o.combineId,
    }));

  let groupedCombineOptions = [];

  filteredCombineOptions.forEach((o) => {
    let sameValueFound = false;
    groupedCombineOptions.forEach((go) => {
      if (go.value === o.value) {
        // combine the names into one select option
        go.name = `${go.name}-${o.name}`;
        sameValueFound = true;
        return;
      }
    });
    if (!sameValueFound) {
      groupedCombineOptions.push({ ...o });
    }
  });

  const allCombineOptions = [
    {
      name: "None",
      value: "",
    },
    ...groupedCombineOptions,
  ];

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
                id: "batch-item-type-selector",
              }}
            >
              {itemTypes.map((t) => (
                <MenuItem key={t.slug} value={t.slug}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            autoHighlight
            autoSelect
            freeSolo
            options={autocompleteOptions}
            getOptionLabel={(option) => {
              if (option.hashId) {
                if (values.type === "blend") {
                  return `${option.hashId}-${option.name}`;
                }
                return `${option.hashId}-${option.name}-${option.supplierName}`;
              }
              return option;
            }}
            value={values.hashId || ""}
            style={{ width: 300 }}
            onChange={onAutocompleteSelection}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{ ...params.InputProps, name: "hashId" }}
                label="Hash ID"
              />
            )}
          />
          <TextField
            className={classes.textField}
            label={
              values.type === "wax" || values.type === "additive"
                ? "% of w + a mix"
                : "% of type"
            }
            value={percentOfBlend || ""}
            type="number"
            onChange={(e) => {
              const val = e.target.value;
              setPercentOfBlend(val);
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
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
              endAdornment: <InputAdornment position="end">oz</InputAdornment>,
              inputProps: weightInputProps,
            }}
          />
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
          {values.type && (
            <FormControl>
              <InputLabel htmlFor="combine-partner-selector">
                Combined Partner
              </InputLabel>
              <Select
                autoFocus
                value={values.combineId || ""}
                onChange={onChange}
                disabled={!filteredCombineOptions.length}
                inputProps={{
                  name: "combineId",
                  id: "combine-partner-selector",
                }}
              >
                {allCombineOptions.map((o) => (
                  <MenuItem key={o.name} value={o.value}>
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
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
