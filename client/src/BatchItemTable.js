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

const styles = theme => ({
  root: {
    overflowX: "auto",
    padding: theme.spacing(2)
  },
  toolbar: {
    backgroundColor: theme.palette.primary.light
  },
  table: {}
});

function BatchItemTable({ itemData, onDeleteClick, onEditClick, classes }) {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {(onDeleteClick || onEditClick) && (
              <TableCell>
                <Typography variant="h6">{`Batch Items (${
                  itemData.length
                })`}</Typography>
              </TableCell>
            )}
            <TableCell>Type</TableCell>
            <TableCell align="right">Hash Id</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemData.map((item, i) => {
            let itemAmount;
            switch (item.type) {
              case "wax":
                itemAmount = item.weightOunces;
                break;
              case "fragrance-oil":
                itemAmount = item.weightOunces;
                break;
              default:
                itemAmount = item.pieces;
            }
            return (
              <TableRow key={i}>
                {(onDeleteClick || onEditClick) && (
                  <TableCell padding="none">
                    {onDeleteClick && (
                      <IconButton onClick={() => onDeleteClick(i)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                    {onEditClick && (
                      <IconButton onClick={() => onEditClick(i)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                )}
                <TableCell>{item.type}</TableCell>
                <TableCell align="right">{item.hashId}</TableCell>
                <TableCell align="right">{itemAmount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(BatchItemTable);
