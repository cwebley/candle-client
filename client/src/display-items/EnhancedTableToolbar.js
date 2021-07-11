import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  button: {
    padding: "0 1rem",
    marginLeft: "0.5rem",
  },
}));

const EnhancedTableToolbar = ({
  editSelectedLink,
  numSelected,
  onDeselectAll,
}) => {
  const classes = useToolbarStyles();

  console.log("EDIT LINK: ", editSelectedLink);
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          RecentCandles
        </Typography>
      )}

      {numSelected > 0 && (
        <Fragment>
          <Tooltip title="Edit selected candles">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<EditIcon />}
              aria-label="edit selected candles"
              href={editSelectedLink}
            >
              Edit
            </Button>
          </Tooltip>
          <Tooltip title="Clear all selections">
            <Button
              variant="outlined"
              className={classes.button}
              color="secondary"
              size="small"
              startIcon={<CancelIcon />}
              aria-label="deselect all items"
              onClick={onDeselectAll}
            >
              Clear
            </Button>
          </Tooltip>
        </Fragment>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  onDeselectAll: PropTypes.func.isRequired,
  numSelected: PropTypes.number.isRequired,
  editSelectedLink: PropTypes.string,
};

export default EnhancedTableToolbar;
