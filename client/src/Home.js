import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import RecentCandles from "./RecentCandles";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    // height: "50vh"
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    flexFlow: "wrap",
    marginBottom: theme.spacing(4),
  },
  mainTitle: {
    display: "block",
    fontSize: "3rem",
  },
  secondaryTitle: {
    display: "block",
    fontSize: "2rem",
  },
  recentCandleWrapper: {
    marginTop: "3rem"
  }
});

function Home({ history, location, classes }) {
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h1" className={classes.mainTitle}>
          Welcome
        </Typography>
      </Paper>
      <Link to={{ pathname: "/new-order" }}>Add New Supply Order</Link>
      <Link to={{ pathname: "/new-candles" }}>Add New Candles</Link>
      <Link to={{ pathname: "/new-batch" }}>Add New Batch</Link>
      <Link to={{ pathname: "/new-blend" }}>Add New Blend</Link>
      <div className={classes.recentCandleWrapper}>
        <RecentCandles />
      </div>
    </div>
  );
}

export default withStyles(styles)(Home);
