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
import handleApiError, {
  currentDate,
  currentDateTime,
  findUniqueInteger,
} from "../utils";
import api from "../api";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

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
  formControl: {
    width: "100%",
  },
}));

function EditCandles({ history, enqueueSnackbar }) {
  const classes = useStyles();
  const [resourceTypes, setResourceTypes] = useState([]);
  const [newBlendItemValues, setNewBlendItemValues] = useState({});
  const [blendItemDialogOpen, setBlendItemDialogOpen] = useState(false);
  const [editItemIndex, setItemEditIndex] = useState(null);
  const [candleListData, setCandleListData] = useState([]);
  const [blendValues, setBlendValues] = useState({
    whenCreated: currentDate(),
    items: [],
  });

  const location = useLocation();
  const { candles, ...rest } = qs.parse(location.search, {
    arrayFormat: "comma",
  });

  let initialCandleHashIds = candles || [];
  if (candles && typeof candles === "string") {
    initialCandleHashIds = [candles];
  }

  const [candleHashIds, setCandleHashIds] = useState(initialCandleHashIds);

  // fetch one time data from the server
  useEffect(() => {
    if (!candleHashIds || !candleHashIds.length) {
      return;
    }
    const fetchCandleList = async () => {
      console.log("CANDLE LIST FETCH");
      try {
        const result = await axios(api.candlesUrl, {
          params: { candles: candleHashIds.join(","), detailed: "true" },
        });
        if (result.data) {
          setCandleListData(result.data);
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };

    fetchCandleList();
  }, [enqueueSnackbar]);

  const handleHashIdSelection = (e, value, reason) => {
    if (reason === "clear") {
      setNewBlendItemValues((values) => {
        const { hashId, itemName, ...valuesWithoutHashId } = values;
        // remove the hashId and the associated description string
        return valuesWithoutHashId;
      });
      return;
    }

    setNewBlendItemValues((values) => {
      return {
        ...values,
        hashId: value.hashId ? value.hashId : value,
        itemName: value.name ? value.name : "",
      };
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

  return (
    <div className={classes.root}>
      <div>
        <header className={classes.header}>
          <Typography align="center" variant="h2">
            Edit Candles
          </Typography>
          <Typography variant="h5" align="right">
            {moment(blendValues.whenCreated).format("MMMM Do YYYY")}
          </Typography>
        </header>
        <main></main>
      </div>
    </div>
  );
}

export default withSnackbar(withRouter(EditCandles));
