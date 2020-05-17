import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import DataLabel from "./DataLabel";
import CandleResource from "./CandleResource";
import CombinedCandleResource from "./CombinedCandleResource";
import { processAllBatchData } from "../utils";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  textField: {
    marginTop: "1em",
  },
  headingHash: {
    flexBasis: "7%",
    marginRight: theme.spacing(2),
  },
  headingName: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: "33%",
  },
  subHeading: {
    flexGrow: 1,
  },
  candleDetails: {
    paddingLeft: theme.spacing(2),
  },
  expansionPanelDetails: {
    flexFlow: "column nowrap",
  },
});

function CandleLayer({ data, isTopLayer, classes }) {
  const processedBatchData = processAllBatchData(data.batchData);
  const layerDetails = [
    {
      label: "Fragrance Load",
      value: processedBatchData.fragranceLoad * 100,
      unit: "%",
    },
    {
      label: "Fragrance Add Temp",
      value: processedBatchData.fragranceAddTemperatureFahrenheit,
      unit: "°F",
    },
    {
      label: "Pour Weight",
      value: data.pourWeightOunces,
      unit: "oz",
    },
    {
      label: "When poured",
      value: moment(data.whenPoured).format("MMMM DD YYYY"),
    },
    {
      label: "Percent of Batch",
      value: data.layerToBatchPercentage,
      unit: "%",
    },
    {
      label: "Pour Temp",
      value: data.pourTemperatureFahrenheit,
      unit: "°F",
    },
    {
      label: "Room Temp",
      value: data.coolingRoomTemperatureFahrenheit,
      unit: "°F",
    },
  ];
  if (processedBatchData.dyeAddTemperature) {
    layerDetails.push({
      label: "Dye Add Temp",
      value: processedBatchData.dyeAddTemperatureFahrenheit,
      unit: "°F",
    });
  }
  if (data.coolingRoomHumidityPercent) {
    layerDetails.push({
      label: "Room Humidity",
      value: data.coolingRoomHumidityPercent,
      unit: "%",
    });
  }
  if (data.notes) {
    layerDetails.push({
      label: "Notes",
      value: data.notes,
    });
  }

  return (
    <ExpansionPanel defaultExpanded={isTopLayer}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.headingHash} color="textSecondary">
          {`${data.hashId}`}
        </Typography>
        <Typography className={classes.headingName}>
          {`Layer from `}
          <Link
            to={`/batches/${processedBatchData.id}`}
          >{`Batch ${processedBatchData.id}`}</Link>
        </Typography>
        {` ${data.layerToBatchPercentage}% of batch`}
        <Typography
          className={classes.subHeading}
          color="textSecondary"
          align="right"
        >
          {`$${data.calculatedCosts.productCost} / $${data.calculatedCosts.shippingCost} / $${data.calculatedCosts.totalCost}`}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <ol className={classes.candleDetails}>
          {layerDetails.map((d) => (
            <DataLabel
              key={d.label}
              label={d.label}
              value={d.value}
              unit={d.unit}
            />
          ))}
        </ol>
        <Grid container spacing={8}>
          {processedBatchData.wax &&
            processedBatchData.wax.map((w) => {
              if (w.subItems) {
                return (
                  <Grid item key={`w-${w.hashId}`} xs={12} sm={6} m={4}>
                    <CombinedCandleResource
                      name={w.name}
                      source={w.source}
                      percentOfType={`${
                        Math.round(
                          (1000 * w.weightOunces) /
                            processedBatchData.totalWaxWeightOunces
                        ) / 10
                      }%`}
                      amount={`${w.layerWeightOunces} oz`}
                      productCost={w.layerCosts.productCost}
                      shippingCost={w.layerCosts.shippingCost}
                      subItems={w.subItems}
                      totalCost={w.layerCosts.totalCost}
                      totalAmountForType={
                        processedBatchData.totalWaxWeightOunces
                      }
                    />
                  </Grid>
                );
              }
              return (
                <Grid item key={`w-${w.hashId}`} xs={12} sm={6} m={4}>
                  <CandleResource
                    name={w.name}
                    source={w.source}
                    percentOfType={`${
                      Math.round(
                        (1000 * w.weightOunces) /
                          processedBatchData.totalWaxWeightOunces
                      ) / 10
                    }%`}
                    amount={`${w.layerWeightOunces} oz`}
                    productCost={w.layerCosts.productCost}
                    shippingCost={w.layerCosts.shippingCost}
                    totalCost={w.layerCosts.totalCost}
                  />
                </Grid>
              );
            })}
          {processedBatchData.fragranceOil &&
            processedBatchData.fragranceOil.map((fo) => {
              if (fo.subItems) {
                return (
                  <Grid item key={`fo-${fo.hashId}`} xs={12} sm={6} m={4}>
                    <CombinedCandleResource
                      name={fo.name}
                      source={fo.source}
                      percentOfType={`${
                        Math.round(
                          (1000 * fo.weightOunces) /
                            processedBatchData.totalFragranceWeightOunces
                        ) / 10
                      }%`}
                      amount={`${fo.layerWeightOunces} oz`}
                      productCost={fo.layerCosts.productCost}
                      shippingCost={fo.layerCosts.shippingCost}
                      subItems={fo.subItems}
                      totalCost={fo.layerCosts.totalCost}
                      totalAmountForType={
                        processedBatchData.totalFragranceWeightOunces
                      }
                    />
                  </Grid>
                );
              }
              return (
                <Grid item key={`fo-${fo.hashId}`} xs={12} sm={6} m={4}>
                  <CandleResource
                    name={fo.name}
                    source={fo.source}
                    percentOfType={`${
                      Math.round(
                        (1000 * fo.weightOunces) /
                          processedBatchData.totalFragranceWeightOunces
                      ) / 10
                    }%`}
                    amount={`${fo.layerWeightOunces} oz`}
                    productCost={fo.layerCosts.productCost}
                    shippingCost={fo.layerCosts.shippingCost}
                    totalCost={fo.layerCosts.totalCost}
                  />
                </Grid>
              );
            })}
          {processedBatchData.dyeBlocks &&
            processedBatchData.dyeBlocks.map((db) => {
              if (db.subItems) {
                return (
                  <Grid item key={`db-${db.hashId}`} xs={12} sm={6} m={4}>
                    <CombinedCandleResource
                      name={db.name}
                      source={db.source}
                      percentOfType={`${
                        Math.round(
                          (1000 * db.weightOunces) /
                            processedBatchData.totalDyeBlockWeightOunces
                        ) / 10
                      }%`}
                      amount={`${db.layerWeightOunces} oz`}
                      productCost={db.layerCosts.productCost}
                      shippingCost={db.layerCosts.shippingCost}
                      subItems={db.subItems}
                      totalCost={db.layerCosts.totalCost}
                      totalAmountForType={
                        processedBatchData.totalDyeBlockWeightOunces
                      }
                    />
                  </Grid>
                );
              }
              return (
                <Grid item key={`db-${db.hashId}`} xs={12} sm={6} m={4}>
                  <CandleResource
                    itemType="Dye Block"
                    name={db.name}
                    source={db.source}
                    percentOfType={`${
                      Math.round(
                        (1000 * db.weightOUnces) /
                          processedBatchData.totalDyeBlockWeightOunces
                      ) / 10
                    }%`}
                    amount={`${db.layerWeightOunces} oz`}
                    shippingCost={db.layerCosts.shippingCost}
                    productCost={db.layerCosts.productCost}
                    totalCost={db.layerCosts.totalCost}
                  />
                </Grid>
              );
            })}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default withStyles(styles)(CandleLayer);
