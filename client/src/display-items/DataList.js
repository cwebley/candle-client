import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {}
});
const DataList = ({ classes, children }) => {
  return <ul className={classes.root}>{children}</ul>;
};

export default withStyles(styles)(DataList);
