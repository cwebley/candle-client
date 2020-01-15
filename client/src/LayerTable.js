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

function LayerTable({
  layerData,
  defaultRoomTemp,
  defaultPourTemp,
  defaultJarTemp,
  defaultRoomHumidity,
  onDeleteClick,
  onEditClick,
  classes
}) {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {(onDeleteClick || onEditClick) && (
              <TableCell>
                <Typography variant="h6">{`Layers (${layerData.length})`}</Typography>
              </TableCell>
            )}
            <TableCell>Candle Hash Id</TableCell>
            <TableCell align="right">Pre-weight</TableCell>
            <TableCell align="right">Jar Temp</TableCell>
            <TableCell align="right">Pour Temp</TableCell>
            <TableCell align="right">Room Temp</TableCell>
            <TableCell align="right">Room Humidity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {layerData.map((layer, i) => (
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
              <TableCell align="right">{layer.candleHashId}</TableCell>
              <TableCell align="right">
                {layer.preppedContainerWeightOunces}
              </TableCell>
              <TableCell align="right">
                {layer.containerTemperatureFahrenheit || defaultJarTemp}
              </TableCell>
              <TableCell align="right">
                {layer.pourTemperatureFahrenheit || defaultPourTemp}
              </TableCell>
              <TableCell align="right">
                {layer.coolingRoomTemperatureFahrenheit || defaultRoomTemp}
              </TableCell>
              <TableCell align="right">
                {layer.coolingRoomHumidityPercent || defaultRoomHumidity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(LayerTable);
