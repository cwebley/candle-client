import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import DataLabel from "../display-items/DataLabel";
import CandleResource from "../display-items/CandleResource";
import BatchLayer from "../display-items/BatchLayer";

const styles = theme => ({
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
  header: {
    padding: theme.spacing(2)
  },
  batchSummary: {},
  fragranceSummary: {},
  resourceTypeTitle: {
    padding: theme.spacing(2)
  }
});

function Batch({ match, classes }) {
  const [batch, setBatch] = useState();

  // fetch one time data from the server
  useEffect(() => {
    const fetchBatch = async () => {
      const result = await axios(
        `http://localhost:5000/batches/${match.params.id}`
      );
      console.log("RESULTS: ", result && result.data);
      if (result && result.data) {
        setBatch(result.data);
      }
    };
    fetchBatch();
  }, [match.params.id]);

  return (
    <div className={classes.root}>
      {batch ? (
        <div>
          <header className={classes.header}>
            <Typography align="center" variant="h2">
              {batch.name || `Batch ${batch.id}`}
            </Typography>
            <Typography align="right" variant="h6">
              {moment(batch.whenCreated).format("MMMM Do YYYY")}
            </Typography>
            <Typography align="right">{batch.hashId || ""}</Typography>
          </header>
          <main>
            <Paper className={classes.paper}>
              <ul className={classes.batchSummary}>
                <DataLabel
                  label="Wax weight"
                  value={batch.totalWaxWeightOunces}
                  unit="oz"
                />
                <DataLabel
                  label="Fragrance Weight"
                  value={batch.totalFragranceWeightOunces}
                  unit="oz"
                />
                <DataLabel
                  label="Fragrance Load"
                  value={batch.fragranceLoad * 100}
                  unit="%"
                />
                <DataLabel
                  label="Fragrance Add Temperature"
                  value={batch.fragranceAddTemperatureFahrenheit}
                  unit="°F"
                />
                {batch.dyeAddTemperatureFahrenheit && (
                  <DataLabel
                    label="Dye Add Temperature"
                    value={batch.dyeAddTemperatureFahrenheit}
                    unit="°F"
                  />
                )}
              </ul>
            </Paper>
            <Typography className={classes.resourceTypeTitle} variant="h5">
              {`Waxes (${batch.wax.length})`}
            </Typography>
            {batch.wax.map(w => (
              <CandleResource
                key={w.hashId}
                name={w.name}
                source={w.source}
                percentOfType={`${Math.round(
                  (1000 * w.weightOunces) / batch.totalWaxWeightOunces
                ) / 10}%`}
                amount={`${w.weightOunces} oz`}
                productCost={w.calculatedCosts.productCost}
                shippingCost={w.calculatedCosts.shippingCost}
                totalCost={w.calculatedCosts.totalCost}
              />
            ))}
            <Typography className={classes.resourceTypeTitle} variant="h5">
              {`Fragrance Oils (${batch.fragranceOil.length})`}
            </Typography>
            {batch.fragranceOil.map(fo => (
              <CandleResource
                key={fo.hashId}
                name={fo.name}
                source={fo.source}
                percentOfType={`${Math.round(
                  (1000 * fo.weightOunces) / batch.totalFragranceWeightOunces
                ) / 10}%`}
                amount={`${fo.weightOunces} oz`}
                productCost={fo.calculatedCosts.productCost}
                shippingCost={fo.calculatedCosts.shippingCost}
                totalCost={fo.calculatedCosts.totalCost}
              />
            ))}
            <Typography className={classes.resourceTypeTitle} variant="h5">
              {`Dye Blocks (${batch.dyeBlocks.length})`}
            </Typography>
            {batch.dyeBlocks.map(db => (
              <CandleResource
                key={db.hashId}
                name={db.name}
                source={db.source}
                price={db.calculatedCosts.totalCost}
              />
            ))}
            <Typography className={classes.resourceTypeTitle} variant="h5">
              {`Layers (${batch.layers.length})`}
            </Typography>
            {batch.layers.map(l => (
              <BatchLayer key={l.hashId} data={l} />
            ))}
          </main>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default withStyles(styles)(Batch);
