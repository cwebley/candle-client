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

const styles = theme => ({
  expandIconWrapper: {
    margin: "0 auto"
  },
  icon: {
    marginLeft: `-4px`
  },
  itemCard: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  itemDetails: {},
  itemType: {
    fontSize: 12
  },
  secondaryInfo: {
    fontSize: 12
  },
  subItemPanel: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: indigo[100],
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  itemPrice: {}
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
  classes
}) {
  const [expanded, setExpanded] = useState(false);
  const subItemIds = subItems.map(s => `${s.type}-${s.hashId}-content`);

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
        let subItemAmount;
        let subItemUnit;
        switch (subItem.type) {
          case "dye-blocks":
            subItemAmount = subItem.pieces;
            subItemUnit = "pieces";
            break;
          case "fragrance-oil":
            subItemAmount = subItem.weightOunces;
            subItemUnit = "oz";
            break;
          case "wax":
            subItemAmount = subItem.weightOunces;
            subItemUnit = "oz";
            break;
          case "additive":
            subItemAmount = subItem.weightOunces;
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
                  {`${Math.round((1000 * subItemAmount) / totalAmountForType) /
                    10}%`}
                </Typography>
                <Typography
                  // className={classes.itemPrice}
                  variant="subtitle1"
                  align="right"
                >
                  {`${subItemAmount} ${subItemUnit}`}
                </Typography>
                <Typography
                  className={classes.itemPrice}
                  variant="subtitle1"
                  align="right"
                >
                  {`$${subItem.calculatedCosts.productCost} | $${subItem.calculatedCosts.shippingCost} | $${subItem.calculatedCosts.totalCost}`}
                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        );
      })}
    </ExpansionPanel>
  );

  //  return (

  //   <Paper className={classes.root}>
  //     <Grid container spacing={3}>
  //       <Grid item container direction="column" sm={8}>
  //         <Grid item>
  //           <Typography variant="subtitle1">{name}</Typography>
  //         </Grid>
  //         <Grid item>
  //           <Typography className={classes.secondaryInfo} color="textSecondary">
  //             {source}
  //           </Typography>
  //         </Grid>
  //       </Grid>
  //       <Grid item sm={4}>
  //         <Typography
  //           // className={classes.itemPrice}
  //           variant="subtitle1"
  //           align="right"
  //         >
  //           {percentOfType}
  //         </Typography>
  //         <Typography
  //           // className={classes.itemPrice}
  //           variant="subtitle1"
  //           align="right"
  //         >
  //           {amount}
  //         </Typography>
  //         <Typography
  //           className={classes.itemPrice}
  //           variant="subtitle1"
  //           align="right"
  //         >
  //           {`$${productCost} | $${shippingCost} | $${totalCost}`}
  //         </Typography>
  //       </Grid>
  //     </Grid>
  //   </Paper>
  //   );
}

export default withStyles(styles)(CombineCandleRes);
