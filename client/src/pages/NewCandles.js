import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { withSnackbar } from "notistack";

import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Add } from "@material-ui/icons";

import CandleTable from "../CandleTable";
import NewCandleDialog from "../item-forms/NewCandle";
import api from "../api.js";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
  },

  form: {},
  header: {
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
    padding: theme.spacing(2),
  },
}));

function NewCandles({ enqueueSnackbar }) {
  const [candleDialogOpen, setCandleDialogOpen] = useState(false);
  const [newCandleValues, setNewCandleValues] = useState({});
  const [editCandleIndex, setCandleEditIndex] = useState(null);
  const [candles, setCandles] = useState([]);
  const classes = useStyles();

  const handleCandleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;

    setNewCandleValues((newCandleValues) => {
      return {
        ...newCandleValues,
        [name]: value || checked,
      };
    });
  };

  const addCandle = (e) => {
    e.preventDefault();

    setCandles((candles) => [...candles, { ...newCandleValues }]);
    setNewCandleValues({});
    setCandleDialogOpen(false);
  };

  const showEditCandle = (index) => {
    setCandleEditIndex(index);
    setNewCandleValues({
      ...candles[index],
    });
    setCandleDialogOpen(true);
  };

  const copyCandle = (index) => {
    setCandleEditIndex(null);
    setNewCandleValues({
      ...candles[index],
    });
    setCandleDialogOpen(true);
  };

  const editCandle = (e) => {
    e.preventDefault();

    setCandles((candles) => [
      ...candles.slice(0, editCandleIndex),
      { ...newCandleValues },
      ...candles.slice(editCandleIndex + 1),
    ]);
    setNewCandleValues({});
    setCandleDialogOpen(false);
    setCandleEditIndex(null);
  };

  const deleteCandle = (index) => {
    setCandles((candles) => [
      ...candles.slice(0, index),
      ...candles.slice(index + 1),
    ]);
  };

  const submitCandles = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(api.newCandlesUrl, candles);
      if (result.data && result.data.length) {
        // clear the page
        setCandles([]);

        // notify the user and provide a link to a pre-populated batch page
        const confirmedHashIds = result.data.map((c) => c.hashId);
        enqueueSnackbar(
          `Candle${result.data.length === 1 ? "" : "s"} ${confirmedHashIds.join(
            ", "
          )} successfully created`,
          {
            variant: "success",
            action: (
              <Button href={`/new-batch?candle=${confirmedHashIds.join(",")}`}>
                Go There
              </Button>
            ),
          }
        );
      }
    } catch (err) {
      let data = err.response && err.response.data;
      if (data && data.reasons) {
        if (data.reasons) {
          data.reasons.forEach((r) =>
            enqueueSnackbar(r.message, { variant: "error" })
          );
          return;
        }
        if (data.message) {
          enqueueSnackbar(data.message, { variant: "error" });
        }
      }
      enqueueSnackbar("Failed to post candles to server", { variant: "error" });
    }
  };

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Typography align="center" variant="h2">
          New Candles
        </Typography>
        <Typography variant="h5" align="right">
          {moment().format("MMMM Do YYYY")}
        </Typography>
      </header>
      <main>
        <IconButton
          className={classes.iconButton}
          onClick={() => setCandleDialogOpen(true)}
        >
          <Add />
          Add Candle
        </IconButton>
        <NewCandleDialog
          values={newCandleValues}
          isOpen={candleDialogOpen}
          onChange={handleCandleFormChange}
          onClose={() => {
            setCandleDialogOpen(false);
            setCandleEditIndex(null);
          }}
          editCandleIndex={editCandleIndex}
          onAddCandle={addCandle}
          onEditCandle={editCandle}
        />
        <form onSubmit={submitCandles} className={classes.form}>
          <CandleTable
            candleData={candles}
            onDeleteClick={deleteCandle}
            onEditClick={showEditCandle}
            onCopyClick={copyCandle}
          />
          <div className={classes.formActions}>
            <Button
              color="primary"
              disabled={!candles.length}
              type="submit"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

// const snackbarLink = candleHashIds => <Button>Go there</Button>;

export default withSnackbar(NewCandles);
