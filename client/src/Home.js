import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh "
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    flexFlow: "wrap"
  }
});

function Home({ history, location, classes }) {
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" paragraph>
          Welcome.
        </Typography>
      </Paper>
      <Link to={{ pathname: "/new-order" }}>Add New Supply Order</Link>
      <Link to={{ pathname: "/new-candles" }}>Add New Candles</Link>
      <Link to={{ pathname: "/new-batch" }}>Add New Batch</Link>
    </div>
  );
}

export default withStyles(styles)(Home);
