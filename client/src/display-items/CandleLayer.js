import React from "react";
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
import moment from "moment";

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap"
  },
  textField: {
    marginTop: "1em"
  },
  headingHash: {
    flexBasis: "7%",
    marginRight: theme.spacing(2)
  },
  headingName: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: "33%"
  },
  subHeading: {
    flexGrow: 1
  },
  candleDetails: {
    paddingLeft: theme.spacing(2)
  },
  expansionPanelDetails: {
    flexFlow: "column nowrap"
  }
});

function CandleLayer({ data, isTopLayer, classes }) {
  const layerDetails = [
    {
      label: "Fragrance Load",
      value: data.batchData.fragranceLoad * 100,
      unit: "%"
    },
    {
      label: "Fragrance Add Temp",
      value: data.batchData.fragranceAddTemperatureFahrenheit,
      unit: "°F"
    },
    {
      label: "Pour Weight",
      value: data.pourWeightOunces,
      unit: "oz"
    },
    {
      label: "When poured",
      value: moment(data.whenPoured).format("MMMM DD YYYY")
    },
    {
      label: "Percent of Batch",
      value: data.layerToBatchPercentage,
      unit: "%"
    },
    {
      label: "Pour Temp",
      value: data.pourTemperatureFahrenheit,
      unit: "°F"
    },
    {
      label: "Room Temp",
      value: data.coolingRoomTemperatureFahrenheit,
      unit: "°F"
    }
  ];
  if (data.batchData.dyeAddTemperature) {
    layerDetails.push({
      label: "Dye Add Temp",
      value: data.batchData.dyeAddTemperatureFahrenheit,
      unit: "°F"
    });
  }
  if (data.coolingRoomHumidityPercent) {
    layerDetails.push({
      label: "Room Humidity",
      value: data.coolingRoomHumidityPercent,
      unit: "%"
    });
  }
  if (data.notes) {
    layerDetails.push({
      label: "Notes",
      value: data.notes
    });
  }

  console.log("layer data: ", data);
  return (
    <ExpansionPanel defaultExpanded={isTopLayer}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.headingHash} color="textSecondary">
          {`${data.hashId}`}
        </Typography>
        <Typography className={classes.headingName}>
          {`Layer from `}
          <Link
            to={`/batches/${data.batchData.id}`}
          >{`Batch ${data.batchData.id}`}</Link>
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
          {layerDetails.map(d => (
            <DataLabel
              key={d.label}
              label={d.label}
              value={d.value}
              unit={d.unit}
            />
          ))}
        </ol>
        <Grid container spacing={8}>
          {data.batchData.wax &&
            data.batchData.wax.map(w => (
              <Grid item key={w.id + w.hashId} xs={12} sm={6} m={4}>
                <CandleResource
                  itemType="Wax"
                  name={w.name}
                  source={w.source}
                  percentOfType={`${Math.round(
                    (1000 * w.weightOunces) /
                      data.batchData.totalWaxWeightOunces
                  ) / 10}%`}
                  amount={`${w.layerWeightOunces} oz`}
                  shippingCost={w.layerCosts.shippingCost}
                  productCost={w.layerCosts.productCost}
                  totalCost={w.layerCosts.totalCost}
                />
              </Grid>
            ))}
          {data.batchData.fragranceOil &&
            data.batchData.fragranceOil.map(fo => (
              <Grid item key={fo.id + fo.hashId} xs={12} sm={6} m={4}>
                <CandleResource
                  itemType="Fragrance Oil"
                  name={fo.name}
                  source={fo.source}
                  percentOfType={`${Math.round(
                    (1000 * fo.weightOunces) /
                      data.batchData.totalFragranceWeightOunces
                  ) / 10}%`}
                  amount={`${fo.layerWeightOunces} oz`}
                  shippingCost={fo.layerCosts.shippingCost}
                  productCost={fo.layerCosts.productCost}
                  totalCost={fo.layerCosts.totalCost}
                />
              </Grid>
            ))}
          {data.batchData.dyeBlocks &&
            data.batchData.dyeBlocks.map(db => (
              <Grid item key={db.id + db.hashId} xs={12} sm={6} m={4}>
                <CandleResource
                  itemType="Dye Block"
                  name={db.name}
                  source={db.source}
                  percentOfType={`${Math.round(
                    (1000 * db.pieces) / data.batchData.totalWaxpieces
                  ) / 10}%`}
                  amount={`${db.layerPieces} pieces`}
                  shippingCost={db.layer.shippingCost}
                  productCost={db.layer.productCost}
                  totalCost={db.layer.totalCost}
                />
              </Grid>
            ))}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default withStyles(styles)(CandleLayer);
