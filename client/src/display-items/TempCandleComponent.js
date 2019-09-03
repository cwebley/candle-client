import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main
  },
  itemDetails: {
    display: "flex",
    flexFlow: "column nowrap"
  },
  itemType: {
    fontSize: 12
  }
});

const TempCandleComponent = ({ type, hashId, classes }) => {
  return (
    <Paper className={classes.root}>
      <div className={classes.itemDetails}>
        <Typography
          className={classes.itemType}
          color="textSecondary"
          align="center"
          gutterBottom
        >
          {type}
        </Typography>
        <Typography variant="subtitle1">{hashId}</Typography>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(TempCandleComponent);
