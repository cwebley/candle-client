import React, { useCallback, useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { withRouter, useLocation } from "react-router-dom";
import { withSnackbar } from "notistack";
import qs from "query-string";

import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Add } from "@material-ui/icons";

import BlendItemDialog from "../BlendItemDialog";
import BatchItemTable from "../BatchItemTable";
import DataList from "../display-items/DataList.js";
import DataLabel from "../display-items/DataLabel.js";
import handleApiError, { currentDate, currentDateTime } from "../utils";
import api from "../api";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
  },
  tableWrapper: {
    marginTop: theme.spacing(2),
  },
  textField: {
    width: "90%",
    padding: theme.spacing(2),
  },
  header: {
    padding: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
  },
  iconButton: {
    borderRadius: 0,
  },
  formActions: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  submitButton: {
    padding: theme.spacing(1),
  },
}));

// blendItems all get a combineId that is unique
// unless specified in the BlendItemForm that the given
// item should be organziationally combined with another
let combineIdCounter = 1;

function NewBlend({ history, enqueueSnackbar }) {
  const classes = useStyles();
  const [resourceTypes, setResourceTypes] = useState([]);
  const [newBlendItemValues, setNewBlendItemValues] = useState({});
  const [blendItemDialogOpen, setBlendItemDialogOpen] = useState(false);
  const [editItemIndex, setItemEditIndex] = useState(null);
  const [targetWeightPounds, setTargetWeightPounds] = useState(null);
  const [waxHashIdOptions, setWaxHashIdOptions] = useState([]);
  const [additiveHashIdOptions, setAdditiveHashIdOptions] = useState([]);
  const [blendValues, setBlendValues] = useState({
    whenCreated: currentDate(),
    items: [],
  });

  // fetch one time data from the server
  useEffect(() => {
    const fetchResourceTypes = async () => {
      try {
        const result = await axios(api.resourceTypesUrl);
        if (result.data) {
          setResourceTypes(result.data);
          if (result.data.length) {
            let blendResources = result.data.filter((r) => r.scope === "blend");
            if (blendResources.length) {
              setNewBlendItemValues((newBlendItemValues) => ({
                ...newBlendItemValues,
                type: blendResources[0].slug,
              }));
            }
          }
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };

    const fetchWaxOptions = async () => {
      try {
        const result = await axios(api.waxesUrl);
        if (result.data) {
          setWaxHashIdOptions(result.data);
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };

    const fetchAdditiveOptions = async () => {
      try {
        const result = await axios(api.additivesUrl);
        if (result.data) {
          setAdditiveHashIdOptions(result.data);
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };

    fetchResourceTypes();
    fetchWaxOptions();
    fetchAdditiveOptions();
  }, [enqueueSnackbar]);

  const handleHashIdSelection = (e, value, reason, more) => {
    if (reason === "clear") {
      setNewBlendItemValues((values) => {
        const {
          hashId,
          hashIdSelectionString,
          ...valuesWithoutHashId
        } = values;
        // remove the hashId and the associated description string
        return valuesWithoutHashId;
      });
      return;
    }

    setNewBlendItemValues((values) => {
      const updatedValues = {
        ...values,
        hashIdSelectionString: values.name !== undefined ? values.name : value,
      };
      if (value.hashId) {
        updatedValues.hashId = value.hashId;
      }
      return updatedValues;
    });
  };

  const handleBlendItemFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;

    setNewBlendItemValues((newBlendItemValues) => {
      // separate the combineId so we can remove the value if `type` is changed
      const { combineId, ...formattedValues } = newBlendItemValues;
      if (name === "finished") {
        return {
          ...formattedValues,
          combineId,
          [name]: checked,
        };
      }

      if (name !== "type") {
        return {
          ...formattedValues,
          combineId,
          [name]: value,
        };
      }

      // if the type is changing, make sure to clear the combineId
      // note: the combineId will be re-added on a new increment in the editBlendItem method
      return {
        ...formattedValues,
        [name]: value,
      };
    });
  };

  const addBlendItem = (e) => {
    const newBlendItem = { ...newBlendItemValues };
    if (!newBlendItem.combineId) {
      newBlendItem.combineId = combineIdCounter;
      combineIdCounter++;
    }
    setBlendValues((blendValues) => {
      return {
        ...blendValues,
        items: [...blendValues.items, { ...newBlendItem }],
      };
    });

    setNewBlendItemValues({
      type: newBlendItem.type,
    });
    setBlendItemDialogOpen(false);
  };

  const clearBlendItemDialogState = () => {
    setBlendItemDialogOpen(false);
    setNewBlendItemValues((newBlendItemValues) => {
      return {
        type: newBlendItemValues.type,
      };
    });
    setItemEditIndex(null);
  };

  const showEditBlendItem = (index) => {
    setItemEditIndex(index);
    setNewBlendItemValues({
      ...blendValues.items[index],
    });
    setBlendItemDialogOpen(true);
  };

  const deleteBlendItem = (index) => {
    setBlendValues((blendValues) => {
      return {
        ...blendValues,
        items: [
          ...blendValues.items.slice(0, index),
          ...blendValues.items.slice(index + 1),
        ],
      };
    });
  };

  const submitBlend = async (e) => {
    e.preventDefault();
    const submitBlendData = async (data) => {
      // this is only here to aid the fixtures and help with
      // batch + blend creation. this can be removed at some point
      data.createBlend = true;

      try {
        const result = await axios.post(api.newBlendUrl, data);
        if (result && result.data) {
          enqueueSnackbar(`Blend ${result.data.blendId} successfully created`, {
            variant: "success",
          });
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };

    // convert pounds to ounces for the api
    blendValues.items.forEach((item) => {
      if (item.weightPounds) {
        item.weightOunces = 16 * parseFloat(item.weightPounds);
      }
      delete item.weightPounds;
    });
    submitBlendData(blendValues);
  };

  const editBlendItem = (e) => {
    const newBlendItem = { ...newBlendItemValues };
    if (!newBlendItem.combineId) {
      newBlendItem.combineId = combineIdCounter;
      combineIdCounter++;
    }

    setBlendValues((blendValues) => {
      return {
        ...blendValues,
        items: [
          ...blendValues.items.slice(0, editItemIndex),
          { ...newBlendItem },
          ...blendValues.items.slice(editItemIndex + 1),
        ],
      };
    });

    setNewBlendItemValues({
      type: newBlendItem.type,
    });
    setBlendItemDialogOpen(false);
    setItemEditIndex(null);
  };

  const updateTargetWeightPounds = (value) => {
    const floatValue = Math.abs(parseFloat(value));
    setTargetWeightPounds(!isNaN(floatValue) ? floatValue : null);
  };

  console.log("BLEND DATA: ", blendValues);

  return (
    <div className={classes.root}>
      <div>
        <header className={classes.header}>
          <Typography align="center" variant="h2">
            {blendValues.name || "New Blend"}
          </Typography>
          <Typography variant="h5" align="right">
            {moment(blendValues.whenCreated).format("MMMM Do YYYY")}
          </Typography>
        </header>
        <main>
          <BlendItemDialog
            previouslySubmittedBlendItems={blendValues.items}
            values={newBlendItemValues}
            itemTypes={resourceTypes.filter((r) => r.scope === "blend")}
            additiveHashIdOptions={additiveHashIdOptions}
            waxHashIdOptions={waxHashIdOptions}
            targetWeightPounds={targetWeightPounds}
            isOpen={blendItemDialogOpen}
            onChange={handleBlendItemFormChange}
            onAutocompleteSelection={handleHashIdSelection}
            onClose={() => clearBlendItemDialogState()}
            editItemIndex={editItemIndex}
            onAddItem={addBlendItem}
            onEditItem={editBlendItem}
          />
          <form onSubmit={submitBlend} className={classes.form}>
            <Paper className={classes.paper}>
              <Grid container spacing={3} justify="space-around">
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Date"
                    type="date"
                    value={blendValues.whenCreated}
                    className={classes.textField}
                    onChange={(e) => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBlendValues((values) => ({
                        ...values,
                        [name]: value,
                      }));
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      name: "whenCreated",
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    className={classes.textField}
                    label="Name"
                    autoFocus
                    value={blendValues.name || ""}
                    type="text"
                    onChange={(e) => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBlendValues((values) => ({
                        ...values,
                        [name]: value,
                      }));
                    }}
                    inputProps={{
                      name: "name",
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Target Weight"
                    className={classes.textField}
                    value={targetWeightPounds || ""}
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      updateTargetWeightPounds(value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">lbs</InputAdornment>
                      ),
                      inputProps: {
                        name: "targetWeightPounds",
                        step: "0.1",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    label="Notes"
                    multiline
                    value={blendValues.notes || ""}
                    className={classes.textField}
                    margin="normal"
                    inputProps={{
                      name: "notes",
                    }}
                    onChange={(e) => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBlendValues((values) => ({
                        ...values,
                        [name]: value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <div className={classes.formActions}>
              <IconButton
                className={classes.iconButton}
                onClick={() => setBlendItemDialogOpen(true)}
              >
                <Add />
                Add Blend Item
              </IconButton>
            </div>
            {!!blendValues.items.length && (
              <Paper className={classes.paper}>
                <DataList>
                  {blendValues.items.length && (
                    <DataLabel
                      label="Total Weight"
                      value={blendValues.items
                        .map((item) => parseFloat(item.weightPounds) || 0)
                        .reduce((acc, val) => acc + val, 0)}
                      unit="lbs"
                    />
                  )}
                </DataList>
              </Paper>
            )}
            {!!blendValues.items.length && (
              <div className={classes.tableWrapper}>
                <BatchItemTable
                  itemData={blendValues.items}
                  amountKey="weightPounds"
                  amountUnit="lbs"
                  onDeleteClick={deleteBlendItem}
                  onEditClick={showEditBlendItem}
                />
              </div>
            )}
            <div className={classes.formActions}>
              <Button
                color="primary"
                type="submit"
                className={classes.submitButton}
              >
                Submit
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default withSnackbar(withRouter(NewBlend));
