import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
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
  appBar: {
    position: 'relative',
  },
  pendingRow: {
    backgroundColor: theme.palette.secondary.light
  }
});

function BurnSummaryDialog({ isOpen, onClose, burns, pendingBurns, classes }) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullScreen>
      <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Burn History
            </Typography>
          </Toolbar>
        </AppBar>
      <DialogContent className={classes.dialogContent}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
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
                  <TableCell align="right">
                    {burn.stoppedWeightOunces}
                  </TableCell>
                  <TableCell align="right">{burn.notes}</TableCell>
                </TableRow>
              );
            })}
            {pendingBurns.map((burn) => {
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
                <TableRow key={burn.id} className={classes.pendingRow}>
                  <TableCell component="th" scope="row">
                    {startMoment.format("L")}
                  </TableCell>
                  <TableCell align="right">{diffString}</TableCell>
                  <TableCell align="right">
                    {burn.stoppedWeightOunces}
                  </TableCell>
                  <TableCell align="right">{burn.notes}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(BurnSummaryDialog);
