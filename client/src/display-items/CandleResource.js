import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import DataLabel from "./DataLabel";

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    position: "relative"
  },
  itemDetails: {
    display: "flex",
    flexFlow: "column nowrap"
  },
  itemType: {
    fontSize: 12
  },
  secondaryInfo: {
    fontSize: 12
  },
  itemPrice: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingRight: theme.spacing(2),
    "&:before": {
      content: '"$"'
    }
  }
});

function CandleResource({ itemType, name, source, price, classes }) {
  return (
    <Paper className={classes.root}>
      <div className={classes.itemDetails}>
        <Typography
          className={classes.itemType}
          color="textSecondary"
          align="center"
          gutterBottom
        >
          {itemType}
        </Typography>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography className={classes.secondaryInfo} color="textSecondary">
          {source}
        </Typography>
      </div>
      <Typography
        className={classes.itemPrice}
        variant="subtitle1"
        align="right"
      >
        {price}
      </Typography>
    </Paper>
  );
}

export default withStyles(styles)(CandleResource);
