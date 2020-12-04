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

import BatchItemDialog from "../BatchItemDialog";
import BatchItemTable from "../BatchItemTable";
import DataList from "../display-items/DataList.js";
import DataLabel from "../display-items/DataLabel.js";
import LayerTable from "../LayerTable";
import NewLayerDialog from "../item-forms/NewLayer";
import handleApiError, { currentDate, currentDateTime } from "../utils";
import api from "../api";
import { calculateFragranceLoadByPopularMethod } from "../utils";

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

// batchItems all get a combineId that is unique
// unless specified in the BatchItemForm that the given
// item should be organziationally combined with another
let combineIdCounter = 1;

function NewBatch({ history, enqueueSnackbar }) {
  const location = useLocation();
  const {
    candle,
    foTarget,
    dyeTemp,
    foTemp,
    jarTemp,
    pourTemp,
    roomTemp,
    roomHumidity,
    fillPercentage,
    ...rest
  } = qs.parse(location.search, {
    arrayFormat: "comma",
  });

  let initialCandleHashIds = candle || [];
  if (candle) {
    if (typeof candle === "string") {
      initialCandleHashIds = [candle];
    }
  }

  const classes = useStyles();
  const [resourceTypes, setResourceTypes] = useState([]);
  const [newBatchItemValues, setNewBatchItemValues] = useState({});
  const [batchItemDialogOpen, setBatchItemDialogOpen] = useState(false);
  const [editItemIndex, setItemEditIndex] = useState(null);
  const [waxWeightSuggestion, setWaxWeightSuggestion] = useState(null);
  const [waxSuggestionGivenJarFill, setWaxSuggestionGivenJarFill] = useState(
    ""
  );
  const [batchValues, setBatchValues] = useState({
    whenCreated: currentDate(),
    fragranceAddTemperatureFahrenheit: foTemp || null,
    dyeAddTemperatureFahrenheit: dyeTemp || null,
    batchItems: [],
    layers: initialCandleHashIds.map((hashId) => ({
      candleHashId: hashId,
      whenPoured: currentDateTime(),
      pourTemperatureFahrenheit: pourTemp,
      coolingRoomHumidityPercent: roomHumidity,
      coolingRoomTemperatureFahrenheit: roomTemp,
      containerTemperatureFahrenheit: jarTemp,
    })),
  });
  const [candleHashIds, setCandleHashIds] = useState(initialCandleHashIds);

  const [layerDialogOpen, setLayerDialogOpen] = useState(false);
  const [newLayerValues, setNewLayerValues] = useState({});
  const [editLayerIndex, setLayerEditIndex] = useState(null);
  const [fragranceLoadTarget, setFragranceLoadTarget] = useState(foTarget);
  const [jarFillPercentage, setJarFillPercentage] = useState(
    fillPercentage || 100
  );
  const [cumulativeWeights, setCumulativeWeights] = useState({});
  const [defaultJarTemp, setDefaultJarTemp] = useState(jarTemp || "");
  const [defaultPourTemp, setDefaultPourTemp] = useState(pourTemp || "");
  const [defaultRoomTemp, setDefaultRoomTemp] = useState(roomTemp || "");
  const [defaultRoomHumidity, setDefaultRoomHumidity] = useState(
    roomHumidity || ""
  );

  const [waxHashIdOptions, setWaxHashIdOptions] = useState([]);
  const [additiveHashIdOptions, setAdditiveHashIdOptions] = useState([]);
  const [blendHashIdOptions, setBlendHashIdOptions] = useState([]);
  const [dyeHashIdOptions, setDyeHashIdOptions] = useState([]);
  const [fragranceOilHashIdOptions, setfragranceOilHashIdOptions] = useState(
    []
  );

  // the values placed in a newly added layer depend on the default values
  // so this fn is memoized each time those values change
  const addLayer = useCallback(
    (layerValues) => {
      setBatchValues((batchValues) => {
        return {
          ...batchValues,
          layers: [...batchValues.layers, layerValues],
        };
      });
      if (layerValues.candleHashId) {
        setCandleHashIds((c) => [...c, layerValues.candleHashId]);
      }

      setNewLayerValues({
        containerTemperatureFahrenheit: defaultJarTemp,
        pourTemperatureFahrenheit: defaultPourTemp,
        coolingRoomTemperatureFahrenheit: defaultRoomTemp,
        coolingRoomHumidityPercent: defaultRoomHumidity,
      });
      setLayerDialogOpen(false);
    },
    [
      // candleHashIds,
      setBatchValues,
      defaultPourTemp,
      defaultRoomHumidity,
      defaultRoomTemp,
      defaultJarTemp,
    ]
  );

  // every time the candleHashIds change, update the url
  useEffect(() => {
    // at the moment the url only needs to update when a layer exists. might revisit this in the future
    if (candleHashIds.length) {
      let url = `/new-batch?candle=${candleHashIds.join(",")}`;
      if (defaultRoomHumidity) {
        url += `&roomHumidity=${defaultRoomHumidity}`;
      }
      if (defaultRoomTemp) {
        url += `&roomTemp=${defaultRoomTemp}`;
      }
      if (defaultPourTemp) {
        url += `&pourTemp=${defaultPourTemp}`;
      }
      if (defaultJarTemp) {
        url += `&jarTemp=${defaultJarTemp}`;
      }
      if (fragranceLoadTarget) {
        url += `&foTarget=${fragranceLoadTarget}`;
      }
      if (batchValues.fragranceAddTemperatureFahrenheit) {
        url += `&foTemp=${batchValues.fragranceAddTemperatureFahrenheit}`;
      }
      if (batchValues.dyeAddTemperatureFahrenheit) {
        url += `&dyeTemp=${batchValues.dyeAddTemperatureFahrenheit}`;
      }
      if (jarFillPercentage) {
        url += `&fillPercentage=${jarFillPercentage}`;
      }
      history.push(url);
      return;
    }
    history.push("/new-batch");
  }, [
    history,
    candleHashIds,
    fragranceLoadTarget,
    batchValues.fragranceAddTemperatureFahrenheit,
    batchValues.dyeAddTemperatureFahrenheit,
    jarFillPercentage,
    defaultJarTemp,
    defaultPourTemp,
    defaultRoomTemp,
    defaultRoomHumidity,
  ]);

  // fetch one time data from the server
  useEffect(() => {
    const fetchResourceTypes = async () => {
      try {
        const result = await axios(api.resourceTypesUrl);
        if (result.data) {
          setResourceTypes(result.data);
          if (result.data.length) {
            let batchResources = result.data.filter((r) => r.scope === "batch");
            if (batchResources.length) {
              setNewBatchItemValues((newBatchItemValues) => ({
                ...newBatchItemValues,
                type: batchResources[0].slug,
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
    const fetchFragranceOptions = async () => {
      try {
        const result = await axios(api.fragranceOilsUrl);
        if (result.data) {
          setfragranceOilHashIdOptions(result.data);
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };
    const fetchDyeOptions = async () => {
      try {
        const result = await axios(api.dyesUrl);
        if (result.data) {
          setDyeHashIdOptions(result.data);
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };
    const fetchBlendOptions = async () => {
      try {
        const result = await axios(api.blendsUrl);
        if (result.data) {
          setBlendHashIdOptions(result.data);
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };

    fetchResourceTypes();
    fetchWaxOptions();
    fetchAdditiveOptions();
    fetchFragranceOptions();
    fetchDyeOptions();
    fetchBlendOptions();
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (!candleHashIds || !candleHashIds.length) {
      return;
    }
    const fetchWaxToFillSum = async () => {
      try {
        const result = await axios(api.waxToFillUrl, {
          params: { candles: candleHashIds.join(",") },
        });
        if (result.data) {
          setWaxWeightSuggestion(result.data.total);
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };
    fetchWaxToFillSum();
  }, [candleHashIds, enqueueSnackbar]);

  useEffect(() => {
    setWaxSuggestionGivenJarFill(
      (
        (waxWeightSuggestion *
          jarFillPercentage *
          (1 - parseFloat(fragranceLoadTarget) / 100)) /
        100
      ).toString()
    );
  }, [
    waxWeightSuggestion,
    setWaxSuggestionGivenJarFill,
    fragranceLoadTarget,
    jarFillPercentage,
  ]);

  const handleBatchItemFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;

    setNewBatchItemValues((newBatchItemValues) => {
      // separate the combineId so we can remove the value if `type` is changed
      const { combineId, ...formattedValues } = newBatchItemValues;
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
      // note: the combineId will be re-added on a new increment in the editBatchItem method
      return {
        ...formattedValues,
        [name]: value,
      };
    });
  };

  const handleHashIdSelection = (e, value, reason, more) => {
    if (reason === "clear") {
      setNewBatchItemValues((values) => {
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

    setNewBatchItemValues((values) => {
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

  const handleLayerFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewLayerValues((newLayerValues) => {
      return {
        ...newLayerValues,
        [name]: value,
      };
    });
  };

  const addBatchItem = (e) => {
    const newBatchItem = { ...newBatchItemValues };
    if (!newBatchItem.combineId) {
      newBatchItem.combineId = combineIdCounter;
      combineIdCounter++;
    }
    setBatchValues((batchValues) => {
      return {
        ...batchValues,
        batchItems: [...batchValues.batchItems, { ...newBatchItem }],
      };
    });

    addToCumulativeWeights(newBatchItem);

    setNewBatchItemValues({
      type: newBatchItem.type,
    });
    setBatchItemDialogOpen(false);
  };

  const addToCumulativeWeights = (newBatchItem) => {
    const previousCumulativeWeights = cumulativeWeights;

    const previousWeightForType =
      previousCumulativeWeights[newBatchItem.type] || 0;

    setCumulativeWeights({
      ...previousCumulativeWeights,
      [newBatchItem.type]:
        previousWeightForType + parseFloat(newBatchItem.weightOunces) || 0,
    });
  };

  const editCumulativeWeights = (uneditedBatchItem, editedBatchItem) => {
    const previousCumulativeWeights = cumulativeWeights;

    const previousWeightForType =
      previousCumulativeWeights[uneditedBatchItem.type] || 0;

    const adjustedPreviousWeightForType =
      previousWeightForType - uneditedBatchItem.weightOunces;

    setCumulativeWeights({
      ...previousCumulativeWeights,
      [editedBatchItem.type]:
        adjustedPreviousWeightForType +
          parseFloat(editedBatchItem.weightOunces) || 0,
    });
  };

  const deleteFromCumulativeWeights = (deletedItem) => {
    const previousCumulativeWeights = cumulativeWeights;

    const previousWeightForType =
      previousCumulativeWeights[deletedItem.type] || 0;

    const adjustedPreviousWeightForType =
      previousWeightForType - deletedItem.weightOunces;

    setCumulativeWeights({
      ...previousCumulativeWeights,
      [deletedItem.type]: adjustedPreviousWeightForType || 0,
    });
  };

  const clearBatchItemDialogState = () => {
    setBatchItemDialogOpen(false);
    setNewBatchItemValues((newBatchItemValues) => {
      return {
        type: newBatchItemValues.type,
      };
    });
    setItemEditIndex(null);
  };

  const showEditBatchItem = (index) => {
    setItemEditIndex(index);
    setNewBatchItemValues({
      ...batchValues.batchItems[index],
    });
    setBatchItemDialogOpen(true);
  };

  const showEditLayers = (index) => {
    setLayerEditIndex(index);
    setNewLayerValues({
      ...batchValues.layers[index],
    });
    setLayerDialogOpen(true);
  };

  const deleteBatchItem = (index) => {
    deleteFromCumulativeWeights(batchValues.batchItems[index]);

    setBatchValues((batchValues) => {
      return {
        ...batchValues,
        batchItems: [
          ...batchValues.batchItems.slice(0, index),
          ...batchValues.batchItems.slice(index + 1),
        ],
      };
    });
  };

  const deleteLayer = (index) => {
    setBatchValues((batchValues) => {
      return {
        ...batchValues,
        layers: [
          ...batchValues.layers.slice(0, index),
          ...batchValues.layers.slice(index + 1),
        ],
      };
    });
    setCandleHashIds((c) => [...c.slice(0, index), ...c.slice(index + 1)]);
  };

  const submitBatch = async (e) => {
    e.preventDefault();
    const submitBatchData = async (data) => {
      try {
        const result = await axios.post(api.newBatchUrl, data);
        if (result && result.data) {
          enqueueSnackbar(`Batch ${result.data.batchId} successfully created`, {
            variant: "success",
          });
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };
    submitBatchData(batchValues);
  };

  const editBatchItem = (e) => {
    const newBatchItem = { ...newBatchItemValues };
    if (!newBatchItem.combineId) {
      newBatchItem.combineId = combineIdCounter;
      combineIdCounter++;
    }

    setBatchValues((batchValues) => {
      return {
        ...batchValues,
        batchItems: [
          ...batchValues.batchItems.slice(0, editItemIndex),
          { ...newBatchItem },
          ...batchValues.batchItems.slice(editItemIndex + 1),
        ],
      };
    });

    editCumulativeWeights(batchValues.batchItems[editItemIndex], newBatchItem);

    setNewBatchItemValues({
      type: newBatchItem.type,
    });
    setBatchItemDialogOpen(false);
    setItemEditIndex(null);
  };

  const editLayer = (editedLayerValues) => {
    setBatchValues((batchValues) => {
      return {
        ...batchValues,
        layers: [
          ...batchValues.layers.slice(0, editLayerIndex),
          { ...editedLayerValues },
          ...batchValues.layers.slice(editLayerIndex + 1),
        ],
      };
    });
    setNewLayerValues({
      containerTemperatureFahrenheit: defaultJarTemp,
      pourTemperatureFahrenheit: defaultPourTemp,
      coolingRoomTemperatureFahrenheit: defaultRoomTemp,
      coolingRoomHumidityPercent: defaultRoomHumidity,
    });
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
      .filter(
        (b) => b.type === "wax" || b.type === "additive" || b.type === "blend"
      )
      .reduce((sum, w) => sum + parseFloat(w.weightOunces), 0);

    const fragranceLoadTargetDecimal = parseFloat(fragranceLoadTarget) / 100;

    // old method
    // return (
    //   (fragranceLoadTargetDecimal * totalWaxWeightOunces) /
    //   (1 - fragranceLoadTargetDecimal)
    // ).toFixed(2);

    return (fragranceLoadTargetDecimal * totalWaxWeightOunces).toFixed(2);
  };

  const updateDefaultJarTemp = (value) => {
    const previousVal = defaultJarTemp;
    setDefaultJarTemp(value);
    setBatchValues({
      ...batchValues,
      layers: batchValues.layers.map((l) => {
        if (
          l.containerTemperatureFahrenheit &&
          l.containerTemperatureFahrenheit !== previousVal
        ) {
          return l;
        }
        return {
          ...l,
          containerTemperatureFahrenheit: value,
        };
      }),
    });
  };
  const updateDefaultPourTemp = (value) => {
    const previousVal = defaultPourTemp;
    setDefaultPourTemp(value);
    setBatchValues({
      ...batchValues,
      layers: batchValues.layers.map((l) => {
        if (
          l.pourTemperatureFahrenheit &&
          l.pourTemperatureFahrenheit !== previousVal
        ) {
          return l;
        }
        return {
          ...l,
          pourTemperatureFahrenheit: value,
        };
      }),
    });
  };
  const updateDefaultRoomTemp = (value) => {
    const previousVal = defaultRoomTemp;
    setDefaultRoomTemp(value);
    setBatchValues({
      ...batchValues,
      layers: batchValues.layers.map((l) => {
        if (
          l.coolingRoomTemperatureFahrenheit &&
          l.coolingRoomTemperatureFahrenheit !== previousVal
        ) {
          return l;
        }
        return {
          ...l,
          coolingRoomTemperatureFahrenheit: value,
        };
      }),
    });
  };
  const updateDefaultRoomHumidity = (value) => {
    const previousVal = defaultRoomHumidity;
    setDefaultRoomHumidity(value);
    setBatchValues({
      ...batchValues,
      layers: batchValues.layers.map((l) => {
        if (
          l.coolingRoomHumidityPercent &&
          l.coolingRoomHumidityPercent !== previousVal
        ) {
          return l;
        }
        return {
          ...l,
          coolingRoomHumidityPercent: value,
        };
      }),
    });
  };

  const updateJarFillPercentage = (value) => {
    const floatValue = Math.abs(parseFloat(value));
    setJarFillPercentage(!isNaN(floatValue) ? floatValue : "");
    setWaxSuggestionGivenJarFill(
      ((waxWeightSuggestion * floatValue) / 100).toString()
    );
  };

  console.log("BATCH DATA: ", batchValues);

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
            combineOptions={batchValues.batchItems}
            values={newBatchItemValues}
            itemTypes={resourceTypes.filter((r) => r.scope === "batch")}
            additiveHashIdOptions={additiveHashIdOptions}
            waxHashIdOptions={waxHashIdOptions}
            blendHashIdOptions={blendHashIdOptions}
            fragranceOilHashIdOptions={fragranceOilHashIdOptions}
            dyeHashIdOptions={dyeHashIdOptions}
            waxWeightSuggestion={waxSuggestionGivenJarFill}
            foWeightSuggestion={getFoWeightSuggestion()}
            isOpen={batchItemDialogOpen}
            onChange={handleBatchItemFormChange}
            onAutocompleteSelection={handleHashIdSelection}
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
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Date"
                    type="date"
                    value={batchValues.whenCreated}
                    className={classes.textField}
                    onChange={(e) => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBatchValues((values) => ({
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
                    value={batchValues.name || ""}
                    type="text"
                    onChange={(e) => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBatchValues((values) => ({
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
                    className={classes.textField}
                    label="FO Target"
                    value={fragranceLoadTarget || ""}
                    type="number"
                    onChange={(e) => {
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
                        max: "50",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    className={classes.textField}
                    label="FO Temp"
                    value={batchValues.fragranceAddTemperatureFahrenheit || ""}
                    type="number"
                    onChange={(e) => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBatchValues((values) => ({
                        ...values,
                        [name]: value,
                      }));
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°F</InputAdornment>
                      ),
                      inputProps: {
                        name: "fragranceAddTemperatureFahrenheit",
                        step: "1",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    className={classes.textField}
                    label="Dye Temp"
                    value={batchValues.dyeAddTemperatureFahrenheit || ""}
                    type="number"
                    onChange={(e) => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBatchValues((values) => ({
                        ...values,
                        [name]: value,
                      }));
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°F</InputAdornment>
                      ),
                      inputProps: {
                        name: "dyeAddTemperatureFahrenheit",
                        step: "1",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Default Pour Temp"
                    className={classes.textField}
                    value={defaultPourTemp}
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      updateDefaultPourTemp(value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°F</InputAdornment>
                      ),
                      inputProps: {
                        name: "defaultPourTemp",
                        step: "1",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Default Jar Temp"
                    className={classes.textField}
                    value={defaultJarTemp}
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      updateDefaultJarTemp(value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°F</InputAdornment>
                      ),
                      inputProps: {
                        name: "defaultJarTemp",
                        step: "1",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Default Room Temp"
                    className={classes.textField}
                    value={defaultRoomTemp}
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      updateDefaultRoomTemp(value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°F</InputAdornment>
                      ),
                      inputProps: {
                        name: "defaultRoomTemp",
                        step: "1",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Default Humidity"
                    className={classes.textField}
                    value={defaultRoomHumidity}
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      updateDefaultRoomHumidity(value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      inputProps: {
                        name: "defaultRoomHumidity",
                        step: "1",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Jar Fill Percentage"
                    className={classes.textField}
                    value={jarFillPercentage}
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      updateJarFillPercentage(value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      inputProps: {
                        name: "jarFillPercentage",
                        step: "1",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    label="Notes"
                    multiline
                    value={batchValues.notes || ""}
                    className={classes.textField}
                    margin="normal"
                    inputProps={{
                      name: "notes",
                    }}
                    onChange={(e) => {
                      const name = e.target.name;
                      const value = e.target.value;
                      setBatchValues((values) => ({
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
                onClick={() => setBatchItemDialogOpen(true)}
              >
                <Add />
                Add Batch Item
              </IconButton>
              <IconButton
                className={classes.iconButton}
                onClick={() => {
                  setNewLayerValues({
                    whenPoured: currentDateTime(),
                    containerTemperatureFahrenheit: defaultJarTemp,
                    pourTemperatureFahrenheit: defaultPourTemp,
                    coolingRoomTemperatureFahrenheit: defaultRoomTemp,
                    coolingRoomHumidityPercent: defaultRoomHumidity,
                  });
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
                      value={cumulativeWeights["wax"].toFixed(2)}
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
                      value={calculateFragranceLoadByPopularMethod({
                        waxWeightOunces: cumulativeWeights.wax,
                        additiveWeightOunces: cumulativeWeights.additives,
                        fragranceWeightOunces:
                          cumulativeWeights["fragrance-oil"],
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
