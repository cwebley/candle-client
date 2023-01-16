import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import CandleLayer from "../display-items/CandleLayer";
import Candle from "../display-items/Candle";
import handleApiError from "../utils";
import api from "../api";

const styles = (theme) => ({
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
  header: {
    padding: theme.spacing(2),
  },
  batchSummary: {},
  fragranceSummary: {},
  resourceTypeTitle: {
    padding: theme.spacing(2),
  },
});

function CandlePage({ match, enqueueSnackbar, history, classes }) {
  const [candle, setCandle] = useState();
  const [updateData, setUpdateData] = useState(null);
  const [updateBurns, setUpdateBurns] = useState([]);
  const [pageEditable, setPageEditable] = useState(null);

  const handleUpdateCandle = async (e) => {
    e.preventDefault();
    const updateCandle = async (data) => {
      try {
        const result = await axios.put(
          api.getUpdateCandleUrl(match.params.id),
          data
        );
        if (result && result.data) {
          enqueueSnackbar(`Candle ${match.params.id} successfully updated`, {
            variant: "success",
          });
          setUpdateData(null);
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };
    updateCandle({ ...updateData, burns: [...updateBurns] });
    fetchCandle();
  };

  const handleCandleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCandle((candleData) => ({
      ...candleData,
      [name]: value,
    }));
    setUpdateData((updateData) => ({
      ...updateData,
      [name]: value,
    }));
  };

  const handleAddCandleComponent = (data) => {
    setUpdateData((updateData) => ({
      ...updateData,
      ...data,
    }));
  };

  const handleAddBurn = (data) => {
    console.log("ADD BURN: ", data);
    setUpdateBurns((updateBurns) => [
      ...updateBurns,
      {
        id: data.id,
        whenStarted: data.whenStarted.format("YYYY-MM-DD HH:mm:ss"),
        whenStopped: data.whenStopped.format("YYYY-MM-DD HH:mm:ss"),
        stoppedWeightOunces: data.stoppedWeightOunces,
        finished: data.finished,
        notes: data.notes,
      },
    ]);
  };

  const fetchCandle = useCallback(async () => {
    const result = await axios(api.getCandleUrl(match.params.id));
    if (result && result.data) {
      setCandle(result.data);
    }
  }, [match.params.id]);

  // fetch one time data from the server
  useEffect(() => {
    fetchCandle();
  }, [fetchCandle]);

  useEffect(() => {
    const { editable, ...rest } = qs.parse(history.location.search);
    if (editable) {
      setPageEditable(true);
      return;
    }
    setPageEditable(false);
  }, [history.location.search]);

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={10}>
        {candle ? (
          <div>
            <header className={classes.header}>
              <Typography align="center" variant="h2">
                {candle.name || `Candle ${candle.hashId}`}
              </Typography>
            </header>
            <main>
              <Candle
                data={candle}
                clientSideData={updateData || {}}
                clientSideBurns={updateBurns || []}
                onFormValueChange={handleCandleFormChange}
                editable={pageEditable}
                onUpdateCandle={handleUpdateCandle}
                onAddComponent={handleAddCandleComponent}
                onAddBurn={handleAddBurn}
                updateDisabled={!updateData && !updateBurns.length}
              />
              {candle.layers.map((l, i) => (
                <CandleLayer key={l.id} isTopLayer={i === 0} data={l} />
              ))}
            </main>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(withSnackbar(withRouter(CandlePage)));
