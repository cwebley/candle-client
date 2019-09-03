import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { RootContext } from "./RootContext";
import { withSnackbar } from "notistack";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    textDecoration: "none"
  },
  navLink: {
    fontWeight: 900,
    color: theme.palette.secondary.contrastText,
    textDecoration: "none",
    padding: theme.spacing(2),
    fontSize: "initial"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

const activeLinkStyle = {
  textDecoration: "underline"
};

const Header = ({ enqueueSnackbar }) => {
  const classes = useStyles();
  const { authToken, setAuthToken } = useContext(RootContext);

  return (
    <AppBar className={classes.root} position="static" color="primary">
      <Toolbar className={classes.toolbar}>
        <Typography
          className={classes.title}
          variant="h6"
          color="inherit"
          component="a"
          href="/"
        >
          {`${process.env.REACT_APP_TITLE}@${process.env.REACT_APP_VERSION}`}
        </Typography>
        <div>
          <Typography
            variant="subtitle1"
            component={props => (
              <NavLink
                to="/new-order"
                activeStyle={activeLinkStyle}
                className={classes.navLink}
              >
                New Order
              </NavLink>
            )}
          />
          <Typography
            variant="subtitle1"
            component={props => (
              <NavLink
                to="/new-candles"
                activeStyle={activeLinkStyle}
                className={classes.navLink}
              >
                New Candles
              </NavLink>
            )}
          />
          <Typography
            variant="subtitle1"
            component={props => (
              <NavLink
                to="/new-batch"
                activeStyle={activeLinkStyle}
                className={classes.navLink}
              >
                New Batch
              </NavLink>
            )}
          />
          {authToken ? (
            <Button
              onClick={() => {
                setAuthToken("");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {}}
              disabled // TODO remove when auth properly set up
            >
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withSnackbar(Header);
