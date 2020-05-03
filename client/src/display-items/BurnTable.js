import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

import moment from "moment";

const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
});

function BurnTable({ burns, classes }) {
  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Start Date</TableCell>
          <TableCell align="right">Burn Time</TableCell>
          <TableCell align="right">Stopped Weight</TableCell>
          <TableCell align="right">Notes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {burns.map((burn) => {
          const startMoment = moment(burn.whenStarted);
          const stopMoment = moment(burn.whenStopped);

          const diffMinutes = stopMoment.diff(startMoment, "minutes");
          let diffString = `${diffMinutes}m`;

          if (diffMinutes >= 60) {
            const diffHours = Math.round(diffMinutes / 60);
            const remainingMinutes = diffMinutes % 60;
            diffString = `${diffHours}h ${remainingMinutes}m`;
          }

          return (
            <TableRow key={burn.burnId}>
              <TableCell component="th" scope="row">
                {startMoment.format("L")}
              </TableCell>
              <TableCell align="right">{diffString}</TableCell>
              <TableCell align="right">{burn.stoppedWeightOunces}</TableCell>
              <TableCell align="right">{burn.notes}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default withStyles(styles)(BurnTable);
