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
import CopyIcon from "@material-ui/icons/FileCopy";
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

function CandleTable({
  candleData,
  onDeleteClick,
  onEditClick,
  onCopyClick,
  classes
}) {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {(onDeleteClick || onEditClick) && (
              <TableCell>
                <Typography variant="h6">{`Candles (${candleData.length})`}</Typography>
              </TableCell>
            )}
            <TableCell>Name</TableCell>
            <TableCell align="right">Jar</TableCell>
            <TableCell align="right">Wick</TableCell>
            <TableCell align="right">Wick Layout</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candleData.map((candle, i) => (
            <TableRow key={i}>
              {(onDeleteClick || onEditClick || onCopyClick) && (
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
                  {onCopyClick && (
                    <IconButton onClick={() => onCopyClick(i)}>
                      <CopyIcon />
                    </IconButton>
                  )}
                </TableCell>
              )}
              <TableCell>{candle.name}</TableCell>
              <TableCell align="right">{candle.jarHashId}</TableCell>
              <TableCell align="right">{candle.wickHashId}</TableCell>
              <TableCell align="right">{`${candle.wickCount}${
                candle.wickLayout ? `-${candle.wickLayout}` : ""
              }`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(CandleTable);
