import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import DataLabel from "../display-items/DataLabel";
import CombinedCandleResource from "../display-items/CombinedCandleResource";
import CandleResource from "../display-items/CandleResource";
import BatchLayer from "../display-items/BatchLayer";
import { processAllBatchData } from "../utils";

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
        const processedData = processAllBatchData(result.data);
        console.log("PROCESSED: ", processedData);
        setBatch(processedData);
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
              <Grid container>
                <Grid item xs={12}>
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
                      value={(batch.fragranceLoad * 100).toFixed(2)}
                      unit="%"
                    />
                    <DataLabel
                      label="Fragrance Temp"
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
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    className={classes.itemPrice}
                    variant="subtitle1"
                    align="right"
                  >
                    {`$${batch.calculatedCosts.productCost} | $${batch.calculatedCosts.shippingCost} | $${batch.calculatedCosts.totalCost}`}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Typography className={classes.resourceTypeTitle} variant="h5">
              {`Waxes (${batch.wax.length})`}
            </Typography>

            {batch.wax.map(w => {
              if (w.subItems) {
                return (
                  <CombinedCandleResource
                    key={w.hashId}
                    name={w.name}
                    source={w.source}
                    percentOfType={`${Math.round(
                      (1000 * w.weightOunces) / batch.totalWaxWeightOunces
                    ) / 10}%`}
                    amount={`${w.weightOunces} oz`}
                    productCost={w.calculatedCosts.productCost}
                    shippingCost={w.calculatedCosts.shippingCost}
                    subItems={w.subItems}
                    totalCost={w.calculatedCosts.totalCost}
                    totalAmountForType={batch.totalWaxWeightOunces}
                  />
                );
              }
              return (
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
              );
            })}
            <Typography className={classes.resourceTypeTitle} variant="h5">
              {`Fragrance Oils (${batch.fragranceOil.length})`}
            </Typography>
            {batch.fragranceOil.map(fo => {
              if (fo.subItems) {
                return (
                  <CombinedCandleResource
                    key={fo.hashId}
                    name={fo.name}
                    source={fo.source}
                    percentOfType={`${Math.round(
                      (1000 * fo.weightOunces) /
                        batch.totalFragranceWeightOunces
                    ) / 10}%`}
                    amount={`${fo.weightOunces} oz`}
                    productCost={fo.calculatedCosts.productCost}
                    shippingCost={fo.calculatedCosts.shippingCost}
                    subItems={fo.subItems}
                    totalCost={fo.calculatedCosts.totalCost}
                    totalAmountForType={batch.totalFragranceWeightOunces}
                  />
                );
              }
              return (
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
              );
            })}
            <Typography className={classes.resourceTypeTitle} variant="h5">
              {`Dye Blocks (${batch.dyeBlocks.length})`}
            </Typography>
            {batch.dyeBlocks.map(db => {
              if (db.subItems) {
                return (
                  <CombinedCandleResource
                    key={db.hashId}
                    name={db.name}
                    source={db.source}
                    percentOfType={`${Math.round(
                      (1000 * db.pieces) / batch.totalDyeBlockPieces
                    ) / 10}%`}
                    amount={`${db.pieces} pieces`}
                    productCost={db.calculatedCosts.productCost}
                    shippingCost={db.calculatedCosts.shippingCost}
                    subItems={db.subItems}
                    totalCost={db.calculatedCosts.totalCost}
                    totalAmountForType={batch.totalDyeBlockPieces}
                  />
                );
              }
              return (
                <CandleResource
                  key={db.hashId}
                  name={db.name}
                  source={db.source}
                  percentOfType={`${Math.round(
                    (1000 * db.pieces) / batch.totalDyeBlockPieces
                  ) / 10}%`}
                  amount={`${db.pieces} pieces`}
                  productCost={db.calculatedCosts.productCost}
                  shippingCost={db.calculatedCosts.shippingCost}
                  totalCost={db.calculatedCosts.totalCost}
                />
              );
            })}
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
