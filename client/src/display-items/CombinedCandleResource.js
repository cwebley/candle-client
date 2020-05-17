import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const styles = (theme) => ({
  expandIconWrapper: {
    margin: "0 auto",
  },
  icon: {
    marginLeft: `-4px`,
  },
  itemCard: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  itemDetails: {},
  itemType: {
    fontSize: 12,
  },
  secondaryInfo: {
    fontSize: 12,
  },
  subItemPanel: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: indigo[100],
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  itemPrice: {},
});

function CombineCandleRes({
  itemType,
  name,
  source,
  amount,
  percentOfType,
  productCost,
  shippingCost,
  subItems,
  totalCost,
  totalAmountForType,
  classes,
}) {
  const [expanded, setExpanded] = useState(false);
  const subItemIds = subItems.map((s) => `${s.type}-${s.hashId}-content`);

  const handleChange = (e, expandState) => {
    setExpanded(expandState);
  };

  return (
    <ExpansionPanel onChange={handleChange}>
      <ExpansionPanelSummary
        aria-controls={subItemIds.join(" ")}
        className={classes.itemCard}
      >
        <Grid container spacing={3}>
          <Grid item container direction="column" sm={8}>
            <Grid item>
              <Typography variant="subtitle1">{name}</Typography>
            </Grid>
            <Grid item>
              <Typography
                className={classes.secondaryInfo}
                color="textSecondary"
              >
                {source}
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.expandIconWrapper}>
                {expanded ? (
                  <ExpandLessIcon className={classes.icon} />
                ) : (
                  <ExpandMoreIcon className={classes.icon} />
                )}
              </div>
            </Grid>
          </Grid>
          <Grid item sm={4}>
            <Typography
              className={classes.itemPrice}
              variant="subtitle1"
              align="right"
            >
              {percentOfType}
            </Typography>
            <Typography
              className={classes.itemPrice}
              variant="subtitle1"
              align="right"
            >
              {amount}
            </Typography>
            <Typography
              className={classes.itemPrice}
              variant="subtitle1"
              align="right"
            >
              {`$${productCost} | $${shippingCost} | $${totalCost}`}
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      {subItems.map((subItem, i) => {
        let subItemBatchAmount;
        let subItemLayerAmount;
        let subItemUnit;
        switch (subItem.type) {
          case "dye-blocks":
            subItemBatchAmount = subItem.weightOunces;
            subItemLayerAmount = subItem.layerWeightOunces;
            subItemUnit = "oz";
            break;
          case "fragrance-oil":
            subItemBatchAmount = subItem.weightOunces;
            subItemLayerAmount = subItem.layerWeightOunces;
            subItemUnit = "oz";
            break;
          case "wax":
            subItemBatchAmount = subItem.weightOunces;
            subItemLayerAmount = subItem.layerWeightOunces;
            subItemUnit = "oz";
            break;
          case "additive":
            subItemBatchAmount = subItem.weightOunces;
            subItemLayerAmount = subItem.layerWeightOunces;
            subItemUnit = "oz";
        }
        return (
          <ExpansionPanelDetails
            key={`${subItem.type}-${subItem.hashId}`}
            className={classes.subItemPanel}
            id={subItemIds[i]}
          >
            <Grid container spacing={3}>
              <Grid item container direction="column" sm={8}>
                <Grid item>
                  <Typography variant="subtitle1">{subItem.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.secondaryInfo}
                    color="textSecondary"
                  >
                    {subItem.source}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item sm={4}>
                <Typography
                  // className={classes.itemPrice}
                  variant="subtitle1"
                  align="right"
                >
                  {`${
                    Math.round(
                      (1000 * subItemBatchAmount) / totalAmountForType
                    ) / 10
                  }%`}
                </Typography>
                <Typography
                  // className={classes.itemPrice}
                  variant="subtitle1"
                  align="right"
                >
                  {`${subItemLayerAmount ? subItemLayerAmount : subItemBatchAmount} ${subItemUnit}`}
                </Typography>
                <Typography
                  className={classes.itemPrice}
                  variant="subtitle1"
                  align="right"
                >
                  {`$${
                    subItem.layerCosts
                      ? subItem.layerCosts.productCost
                      : subItem.calculatedCosts.productCost
                  } | $${subItem.layerCosts
                    ? subItem.layerCosts.shippingCost
                    : subItem.calculatedCosts.shippingCost} | $${
                      subItem.layerCosts
                      ? subItem.layerCosts.totalCost
                      : subItem.calculatedCosts.totalCost
                  }`}
                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        );
      })}
    </ExpansionPanel>
  );
}

export default withStyles(styles)(CombineCandleRes);
