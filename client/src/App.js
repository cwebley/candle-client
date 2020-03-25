import React, { Component } from "react";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header.js";
import RootContext from "./RootContext";
import Home from "./Home";
import NewOrder from "./NewOrder";
import NewBatch from "./pages/NewBatch";
import NewCandles from "./pages/NewCandles";
import Batch from "./pages/Batch";
import Order from "./Order";
import Candle from "./pages/Candle";
import { SnackbarProvider } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <RootContext>
              <Router>
                <Header />
                <Switch>
                  <Route path="/new-order" component={NewOrder} />
                  <Route path="/new-batch" component={NewBatch} />
                  <Route path="/new-candles" component={NewCandles} />
                  <Route path="/batches/:id" component={Batch} />
                  <Route path="/orders/:id" component={Order} />
                  <Route path="/:id" component={Candle} />
                  <Route path="/" component={Home} />
                </Switch>
              </Router>
            </RootContext>
          </MuiPickersUtilsProvider>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
