import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap"
  },
  textField: {
    marginTop: "1em"
  },
  costs: {},
  paper: {
    padding: theme.spacing(2)
  }
});

function DisplayItem({ data, classes }) {
  let amountKey = "amount";
  let amountUnit = "";
  if (data.type === "wax") {
    amountKey = "weightPounds";
    amountUnit = "lbs";
  }
  if (data.type === "fragrance-oil") {
    amountKey = "weightOunces";
    amountUnit = "oz";
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6">{`${data.name}-${data.source}`}</Typography>
        <Typography variant="body1">{`${
          data[amountKey]
        } ${amountUnit}`}</Typography>
        <div className={classes.costs}>
          <Typography variant="body1">{`$${
            data.calculatedCosts.totalCost
          }`}</Typography>
        </div>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(DisplayItem);
