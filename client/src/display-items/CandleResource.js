import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4)
    // position: "relative"
  },
  itemDetails: {
    // display: "flex",
    // flexFlow: "column nowrap"
  },
  itemType: {
    fontSize: 12
  },
  secondaryInfo: {
    fontSize: 12
  },
  itemPrice: {
    // position: "absolute",
    // bottom: 0,
    // right: 0,
    // paddingRight: theme.spacing(2)
    // "&:before": {
    //   content: '"$"'
    // }
  }
});

function CandleResource({
  itemType,
  name,
  source,
  amount,
  percentOfType,
  productCost,
  shippingCost,
  totalCost,
  classes
}) {
  console.log("TCL: percentOfType", percentOfType);
  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item container direction="column" sm={8}>
          <Grid item>
            <Typography variant="subtitle1">{name}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.secondaryInfo} color="textSecondary">
              {source}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sm={4}>
          <Typography
            // className={classes.itemPrice}
            variant="subtitle1"
            align="right"
          >
            {percentOfType}
          </Typography>
          <Typography
            // className={classes.itemPrice}
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
    </Paper>
  );
}

export default withStyles(styles)(CandleResource);
