import React from "react";
import Paper from "@material-ui/core/Paper";
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
import lightBlue from "@material-ui/core/colors/lightBlue";

const styles = (theme) => ({
  root: {
    overflowX: "auto",
    padding: theme.spacing(2),
  },
  toolbar: {
    backgroundColor: theme.palette.primary.light,
  },
  table: {},
  combine1: {
    backgroundColor: lightBlue[100],
  },
  combine2: {
    backgroundColor: lightBlue[500],
  },
  combine3: {
    backgroundColor: lightBlue[300],
  },
  combine4: {
    backgroundColor: lightBlue[400],
  },
  combine5: {
    backgroundColor: lightBlue[200],
  },
});

function BatchItemTable({
  amountKey,
  disabledKey,
  amountUnit,
  itemData,
  onDeleteClick,
  onEditClick,
  classes,
}) {
  let groupCombineData = [];
  let combineClassCount = 0;

  itemData.forEach((o) => {
    let updatedItem = { ...o };
    groupCombineData.forEach((gd, i) => {
      if (gd.combineId === o.combineId) {
        // if it already has a combineClassName and is a combineId match, its part of a multi-combine
        // if not, we can increment the combineClassCount
        if (!gd.combineClassName) {
          // reset the counter back to 0 if we have tons of combined items to show
          if (combineClassCount === 5) {
            combineClassCount = 0;
          }
          combineClassCount++;
        }

        gd.combineClassName = `combine${combineClassCount}`;
        updatedItem.combineClassName = `combine${combineClassCount}`;
      }
    });
    groupCombineData.push(updatedItem);
  });

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {(onDeleteClick || onEditClick) && (
              <TableCell>
                <Typography variant="h6">{`Batch Items (${itemData.length})`}</Typography>
              </TableCell>
            )}
            <TableCell>Type</TableCell>
            <TableCell align="right">Hash Id</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupCombineData.map((item, i) => {
            let itemAmount =
              amountKey && amountKey === "weightPounds"
                ? item.weightPounds
                : item.weightOunces;
            return (
              <TableRow
                key={i}
                className={`${classes.row} ${
                  item.combineClassName ? classes[item.combineClassName] : ""
                }`}
              >
                {(onDeleteClick || onEditClick) && (
                  <TableCell padding="none">
                    {onDeleteClick && (
                      <IconButton
                        disabled={item[disabledKey]}
                        onClick={() => onDeleteClick(i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                    {onEditClick && (
                      <IconButton
                        disabled={item[disabledKey]}
                        onClick={() => onEditClick(i)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                )}
                <TableCell>{item.type}</TableCell>
                <TableCell align="right">{item.hashId}</TableCell>
                <TableCell align="right">{`${itemAmount} ${
                  amountUnit || "oz"
                }`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(BatchItemTable);
