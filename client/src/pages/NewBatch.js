import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { withRouter } from "react-router-dom";
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

import BatchItemDialog from "../BatchItemDialog";
import BatchItemTable from "../BatchItemTable";
import DataList from "../display-items/DataList.js";
import DataLabel from "../display-items/DataLabel.js";
import LayerTable from "../LayerTable";
import NewLayerDialog from "../item-forms/NewLayer";
import handleApiError, { currentDate, currentDateTime } from "../utils";
import api from "../api";
import { calculateFragranceLoad } from "../utils";

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    padding: theme.spacing(2)
  },
  tableWrapper: {
    marginTop: theme.spacing(2)
  },
  textField: {
    width: "90%",
    padding: theme.spacing(2)
  },
  header: {
    padding: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(2)
  },
  iconButton: {
    borderRadius: 0
  },
  formActions: {
    textAlign: "center",
    marginTop: theme.spacing(2)
  },
  submitButton: {
    padding: theme.spacing(1)
  }
}));

function NewBatch({ history, enqueueSnackbar }) {
  const classes = useStyles();
  const [resourceTypes, setResourceTypes] = useState([]);
  const [newBatchItemValues, setNewBatchItemValues] = useState({});
  const [batchItemDialogOpen, setBatchItemDialogOpen] = useState(false);
  const [editItemIndex, setItemEditIndex] = useState(null);
  const [waxWeightSuggestion, setWaxWeightSuggestion] = useState("");
  const [batchValues, setBatchValues] = useState({
    whenCreated: currentDate(),
    batchItems: [],
    layers: []
  });
  const [candleHashIds, setCandleHashIds] = useState([]);

  const [layerDialogOpen, setLayerDialogOpen] = useState(false);
  const [newLayerValues, setNewLayerValues] = useState({});
  const [editLayerIndex, setLayerEditIndex] = useState(null);
  const [fragranceLoadTarget, setFragranceLoadTarget] = useState(null);
  const [cumulativeWeights, setCumlativeWeights] = useState({});
  const [defaultJarTemp, setDefaultJarTemp] = useState("");
  const [defaultPourTemp, setDefaultPourTemp] = useState("");
  const [defaultRoomTemp, setDefaultRoomTemp] = useState("");
  const [defaultRoomHumidity, setDefaultRoomHumidity] = useState("");

  useEffect(() => {
    const { candle, ...rest } = qs.parse(history.location.search, {
      arrayFormat: "comma"
    });
    if (!candle) {
      return;
    }
    console.log("RUNNING");
    if (typeof candle === "string") {
      // only one candle in the query string
      addLayer({ candleHashId: candle, whenPoured: currentDateTime() });
      setCandleHashIds([...candleHashIds, candle]);

      return;
    }
    // array of candles in the query string
    candle.forEach(c => {
      addLayer({ candleHashId: c, whenPoured: currentDateTime() });
    });
    setCandleHashIds([...candleHashIds, ...candle]);
  }, [history.location.search]);

  // fetch one time data from the server
  useEffect(() => {
    const fetchResourceTypes = async () => {
      try {
        const result = await axios(api.resourceTypesUrl);
        if (result.data) {
          setResourceTypes(result.data);
          if (result.data.length) {
            let batchResources = result.data.filter(r => r.scope === "batch");
            if (batchResources.length) {
              setNewBatchItemValues(newBatchItemValues => ({
                ...newBatchItemValues,
                type: batchResources[0].slug
              }));
            }
          }
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };
    fetchResourceTypes();
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (!candleHashIds || !candleHashIds.length) {
      return;
    }
    const fetchWaxToFillSum = async () => {
      try {
        const result = await axios(api.waxToFillUrl, {
          params: { candles: candleHashIds.join(",") }
        });
        if (result.data) {
          setWaxWeightSuggestion(result.data.total.toString());
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };
    fetchWaxToFillSum();
  }, [candleHashIds]);

  const handleBatchItemFormChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setNewBatchItemValues(newBatchItemValues => {
      let formattedValues = newBatchItemValues;
      if (name === "type") {
        if (value === "wax") {
          // destructure to remove the extra fields
          let { pieces, ...rest } = newBatchItemValues;
          formattedValues = rest;
        }
        if (value === "fragrance-oil") {
          // destructure to remove the extra fields
          let { pieces, ...rest } = newBatchItemValues;
          formattedValues = rest;
        }
        if (value === "dye-blocks") {
          // destructure to remove the extra fields
          let { weightOunces, ...rest } = newBatchItemValues;
          formattedValues = rest;
        }
      }
      return {
        ...formattedValues,
        [name]: value
      };
    });
  };

  const handleLayerFormChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setNewLayerValues(newLayerValues => {
      return {
        ...newLayerValues,
        [name]: value
      };
    });
  };

  const addBatchItem = e => {
    const newBatchItem = { ...newBatchItemValues };
    setBatchValues(batchValues => {
      return {
        ...batchValues,
        batchItems: [...batchValues.batchItems, newBatchItem]
      };
    });

    updateCumulativeWeights(newBatchItemValues);

    setNewBatchItemValues({
      type: newBatchItem.type
    });
    setBatchItemDialogOpen(false);
  };

  const updateCumulativeWeights = newBatchItem => {
    const previousCumulativeWeights = cumulativeWeights;

    const previousWeightForType =
      previousCumulativeWeights[newBatchItem.type] || 0;

    setCumlativeWeights({
      ...previousCumulativeWeights,
      [newBatchItem.type]:
        previousWeightForType + parseFloat(newBatchItem.weightOunces) || 0
    });
  };

  const clearBatchItemDialogState = () => {
    setBatchItemDialogOpen(false);
    setNewBatchItemValues(newBatchItemValues => {
      return {
        type: newBatchItemValues.type
      };
    });
    setItemEditIndex(null);
  };

  const addLayer = layerValues => {
    console.log("TCL: layerValues", layerValues);
    setBatchValues(batchValues => {
      return {
        ...batchValues,
        layers: [...batchValues.layers, layerValues]
      };
    });
    if (newLayerValues.candleHashId) {
      setCandleHashIds([...candleHashIds, layerValues.candleHashId]);
    }
    setNewLayerValues({});
    setLayerDialogOpen(false);
  };

  const showEditBatchItem = index => {
    setItemEditIndex(index);
    setNewBatchItemValues({
      ...batchValues.batchItems[index]
    });
    setBatchItemDialogOpen(true);
  };

  const showEditLayers = index => {
    setLayerEditIndex(index);
    setNewLayerValues({
      ...batchValues.layers[index]
    });
    setLayerDialogOpen(true);
  };

  const deleteBatchItem = index => {
    setBatchValues(batchValues => {
      return {
        ...batchValues,
        batchItems: [
          ...batchValues.batchItems.slice(0, index),
          ...batchValues.batchItems.slice(index + 1)
        ]
      };
    });
  };

  const deleteLayer = index => {
    setBatchValues(batchValues => {
      return {
        ...batchValues,
        layers: [
          ...batchValues.layers.slice(0, index),
          ...batchValues.layers.slice(index + 1)
        ]
      };
    });
  };

  const submitBatch = async e => {
    e.preventDefault();
    const submitBatchData = async data => {
      try {
        const result = await axios.post(api.newBatchUrl, data);
        if (result && result.data) {
          enqueueSnackbar(`Batch ${result.data.batchId} successfully created`, {
            variant: "success"
          });
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };
    submitBatchData(batchValues);
  };

  const editBatchItem = e => {
    setBatchValues(batchValues => {
      return {
        ...batchValues,
        batchItems: [
          ...batchValues.batchItems.slice(0, editItemIndex),
          { ...newBatchItemValues },
          ...batchValues.batchItems.slice(editItemIndex + 1)
        ]
      };
    });
    setNewBatchItemValues({
      type: newBatchItemValues.type
    });
    setBatchItemDialogOpen(false);
    setItemEditIndex(null);
  };

  const editLayer = editedLayerValues => {
    setBatchValues(batchValues => {
      return {
        ...batchValues,
        layers: [
          ...batchValues.layers.slice(0, editLayerIndex),
          { ...editedLayerValues },
          ...batchValues.layers.slice(editLayerIndex + 1)
        ]
      };
    });
    setNewLayerValues({});
    setLayerDialogOpen(false);
    setLayerEditIndex(null);
  };

  const getFoWeightSuggestion = () => {
    if (!fragranceLoadTarget) {
      return;
    }
    if (!batchValues.batchItems.length) {
      return;
    }
    const totalWaxWeightOunces = batchValues.batchItems
      .filter(b => b.type === "wax")
      .reduce((sum, w) => sum + parseFloat(w.weightOunces), 0);

    const fragranceLoadTargetDecimal = parseFloat(fragranceLoadTarget) / 100;

    return (
      (fragranceLoadTargetDecimal * totalWaxWeightOunces) /
      (1 - fragranceLoadTargetDecimal)
    ).toFixed(2);
  };

  return (
    <div className={classes.root}>
      <div>
        <header className={classes.header}>
          <Typography align="center" variant="h2">
            {batchValues.name || "New Batch"}
          </Typography>
          <Typography variant="h5" align="right">
            {moment(batchValues.whenCreated).format("MMMM Do YYYY")}
          </Typography>
        </header>
        <main>
          <BatchItemDialog
            values={newBatchItemValues}
            itemTypes={resourceTypes.filter(r => r.scope === "batch")}
            waxWeightSuggestion={waxWeightSuggestion}
            foWeightSuggestion={getFoWeightSuggestion()}
            isOpen={batchItemDialogOpen}
            onChange={handleBatchItemFormChange}
            onClose={() => clearBatchItemDialogState()}
            editItemIndex={editItemIndex}
            onAddItem={addBatchItem}
            onEditItem={editBatchItem}
          />
          <NewLayerDialog
            values={newLayerValues}
            isOpen={layerDialogOpen}
            onChange={handleLayerFormChange}
            onClose={() => {
              setLayerDialogOpen(false);
              setLayerEditIndex(null);
            }}
            editLayerIndex={editLayerIndex}
            onAddLayer={addLayer}
            onEditLayer={editLayer}
          />
          <form onSubmit={submitBatch} className={classes.form}>
            <Paper className={classes.paper}>
              <Grid container spacing={3} justify="space-around">
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Date"
                    type="date"
                    value={batchValues.whenCreated}
                    className={classes.textField}
                    onChange={e => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBatchValues(values => ({
                        ...values,
                        [name]: value
                      }));
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      name: "whenCreated"
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    label="Name"
                    autoFocus
                    value={batchValues.name || ""}
                    type="text"
                    onChange={e => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBatchValues(values => ({
                        ...values,
                        [name]: value
                      }));
                    }}
                    inputProps={{
                      name: "name"
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    className={classes.textField}
                    label="FO Target"
                    value={fragranceLoadTarget || ""}
                    type="number"
                    onChange={e => {
                      const value = e.target.value;
                      setFragranceLoadTarget(parseFloat(value));
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      inputProps: {
                        name: "fragranceLoadTarget",
                        step: "0.1",
                        max: "50"
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    className={classes.textField}
                    label="Dye Temp"
                    value={batchValues.dyeAddTemperatureFahrenheit || ""}
                    type="number"
                    onChange={e => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBatchValues(values => ({
                        ...values,
                        [name]: value
                      }));
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°F</InputAdornment>
                      ),
                      inputProps: {
                        name: "dyeAddTemperatureFahrenheit",
                        step: "1"
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    className={classes.textField}
                    label="FO Temp"
                    value={batchValues.fragranceAddTemperatureFahrenheit || ""}
                    type="number"
                    onChange={e => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBatchValues(values => ({
                        ...values,
                        [name]: value
                      }));
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°F</InputAdornment>
                      ),
                      inputProps: {
                        name: "fragranceAddTemperatureFahrenheit",
                        step: "1"
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Default Jar Temp"
                    value={defaultJarTemp}
                    type="number"
                    onChange={e => {
                      const value = e.target.value;
                      setDefaultJarTemp(value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°F</InputAdornment>
                      ),
                      inputProps: {
                        name: "defaultJarTemp",
                        step: "1"
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Default Pour Temp"
                    value={defaultPourTemp}
                    type="number"
                    onChange={e => {
                      const value = e.target.value;
                      setDefaultPourTemp(value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°F</InputAdornment>
                      ),
                      inputProps: {
                        name: "defaultPourTemp",
                        step: "1"
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Default Room Temp"
                    value={defaultRoomTemp}
                    type="number"
                    onChange={e => {
                      const value = e.target.value;
                      setDefaultRoomTemp(value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°F</InputAdornment>
                      ),
                      inputProps: {
                        name: "defaultRoomTemp",
                        step: "1"
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Default Humidity"
                    value={defaultRoomHumidity}
                    type="number"
                    onChange={e => {
                      const value = e.target.value;
                      setDefaultRoomHumidity(value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      inputProps: {
                        name: "defaultRoomHumidity",
                        step: "1"
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Notes"
                    multiline
                    value={batchValues.notes || ""}
                    className={classes.textField}
                    margin="normal"
                    inputProps={{
                      name: "notes"
                    }}
                    onChange={e => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBatchValues(values => ({
                        ...values,
                        [name]: value
                      }));
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <div className={classes.formActions}>
              <IconButton
                className={classes.iconButton}
                onClick={() => setBatchItemDialogOpen(true)}
              >
                <Add />
                Add Batch Item
              </IconButton>
              <IconButton
                className={classes.iconButton}
                onClick={() => {
                  setNewLayerValues({ whenPoured: currentDateTime() });
                  setLayerDialogOpen(true);
                }}
              >
                <Add />
                Add Layer
              </IconButton>
            </div>
            {!!batchValues.batchItems.length && (
              <Paper className={classes.paper}>
                <DataList>
                  {cumulativeWeights.wax && (
                    <DataLabel
                      label="Total Wax Weight"
                      value={cumulativeWeights["wax"]}
                      unit="oz"
                    />
                  )}
                  {cumulativeWeights["fragrance-oil"] && (
                    <DataLabel
                      label="Total FO Weight"
                      value={cumulativeWeights["fragrance-oil"].toFixed(2)}
                      unit="oz"
                    />
                  )}
                  {cumulativeWeights["fragrance-oil"] && cumulativeWeights.wax && (
                    <DataLabel
                      label="Fragrance Load"
                      value={calculateFragranceLoad({
                        waxWeightOunces: cumulativeWeights.wax,
                        fragranceWeightOunces:
                          cumulativeWeights["fragrance-oil"],
                        additiveWeightOunces: cumulativeWeights["additives"]
                      })}
                      unit="%"
                    />
                  )}
                  {cumulativeWeights.additives && (
                    <DataLabel
                      label="Total Additive Weight"
                      value={cumulativeWeights.additives}
                      unit="oz"
                    />
                  )}
                </DataList>
              </Paper>
            )}
            {!!batchValues.batchItems.length && (
              <div className={classes.tableWrapper}>
                <BatchItemTable
                  itemData={batchValues.batchItems}
                  onDeleteClick={deleteBatchItem}
                  onEditClick={showEditBatchItem}
                />
              </div>
            )}

            {!!batchValues.layers.length && (
              <div className={classes.tableWrapper}>
                <LayerTable
                  layerData={batchValues.layers}
                  defaultJarTemp={defaultJarTemp}
                  defaultPourTemp={defaultPourTemp}
                  defaultRoomTemp={defaultRoomTemp}
                  defaultRoomHumidity={defaultRoomHumidity}
                  onDeleteClick={deleteLayer}
                  onEditClick={showEditLayers}
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

export default withSnackbar(withRouter(NewBatch));
