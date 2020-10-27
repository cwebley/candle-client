import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import ItemTable from "./ItemTable";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    padding: theme.spacing(2)
  },
  header: {
    padding: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(2)
  }
});

function Order({ match, classes }) {
  const [orderData, setOrderData] = useState();

  // fetch one time data from the server
  useEffect(
    () => {
      const fetchSupplyOrder = async () => {
        const result = await axios(
          `http://localhost:5000/supply-orders/${match.params.id}`
        );
        console.log("RESULTS: ", result && result.data);
        if (result && result.data) {
          setOrderData(result.data);
        }
      };
      fetchSupplyOrder();
    },
    [match.params.id]
  );

  return (
    <div className={classes.root}>
      {orderData ? (
        <div>
          <header className={classes.header}>
            <Typography align="center" variant="h2">
              {`${orderData.supplierName || "Unknown"} Order`}
            </Typography>
            <Typography variant="h5" align="right">
              {moment(orderData.openDate).format("MMMM Do YYYY")}
            </Typography>
            <Typography align="right">{orderData.hashId || ""}</Typography>
          </header>
          <main>
            <Paper className={classes.paper}>
              <ItemTable itemData={orderData.items} fromServer />
            </Paper>
          </main>
          <footer className={classes.footer}>
            <Typography variant="h6" align="right">
              {`Subtotal: $${orderData.subtotalCost}`}
            </Typography>
            <Typography variant="h6" align="right">
              {`Shipping: $${orderData.shippingCost}`}
            </Typography>
            <Typography variant="h6" align="right">
              {`Taxes and Fees: $${orderData.taxesAndFees}`}
            </Typography>
            <Typography variant="h5" align="right">
              {`$${orderData.totalCost}`}
            </Typography>
            <Typography align="center" paragraph>
              {orderData.notes}
            </Typography>
          </footer>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default withStyles(styles)(Order);
