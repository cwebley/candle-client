import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Toolbar from "@material-ui/core/Toolbar";

import brown from "@material-ui/core/colors/brown";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import purple from "@material-ui/core/colors/purple";

const styles = (theme) => ({
  root: {},
  toolbar: {
    backgroundColor: theme.palette.primary.light,
  },
  brownBackground: {
    color: "#fff",
    backgroundColor: brown["500"],
  },
  blueBackground: {
    color: "#fff",
    backgroundColor: blue["500"],
  },
  pinkBackground: {
    color: "#fff",
    backgroundColor: pink["400"],
  },
  redBackground: {
    color: "#fff",
    backgroundColor: red["700"],
  },
  purpleBackground: {
    backgroundColor: purple["500"],
  },
  greyBackground: {
    color: "#fff",
    backgroundColor: grey["900"],
  },
  label: {
    width: "3em",
  },
});

const getAvatarClass = (data, classes) => {
  switch (data.categoryColor) {
    case "brown":
      return classes.brownBackground;
    case "blue":
      return classes.blueBackground;
    case "pink":
      return classes.pinkBackground;
    case "red":
      return classes.redBackground;
    case "purple":
      return classes.purpleBackground;
    default:
      return classes.greyBackground;
  }
};

function ItemTable({
  itemData,
  onDeleteItem,
  onEditItem,
  fromServer,
  classes,
}) {
  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Items</Typography>
      </Toolbar>
      <div className="tableWrapper">
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {(onDeleteItem || onEditItem) && <TableCell />}
              <TableCell>Name</TableCell>
              {fromServer && <TableCell align="right">Hash Id</TableCell>}
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemData.map((item, i) => (
              <TableRow key={i}>
                {(onDeleteItem || onEditItem) && (
                  <TableCell padding="none">
                    {onDeleteItem && (
                      <IconButton onClick={() => onDeleteItem(i)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                    {onEditItem && (
                      <IconButton onClick={() => onEditItem(i)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                )}
                <TableCell>{item.name}</TableCell>
                {fromServer && (
                  <TableCell align="right">
                    <Chip
                      classes={{ label: classes.label }}
                      avatar={
                        <Avatar className={getAvatarClass(item, classes)} />
                      }
                      label={item.hashId}
                    />
                  </TableCell>
                )}
                <TableCell align="right">{item.type}</TableCell>
                <TableCell align="right">
                  {`${item.remaining} /
                  ${
                    item.count ||
                    item.volume ||
                    item.weightOunces ||
                    item.weightPounds
                  }`}
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default withStyles(styles)(ItemTable);
