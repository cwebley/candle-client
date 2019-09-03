import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import DataLabel from "./DataLabel";

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap"
  },
  textField: {
    marginTop: "1em"
  },
  headingHash: {
    flexBasis: "7%",
    marginRight: theme.spacing(2)
  },
  headingName: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: "33%"
  },
  subHeading: {
    flexGrow: 1
  },
  candleDetails: {
    paddingLeft: theme.spacing(2)
  },
  expansionPanelDetails: {
    flexFlow: "column nowrap"
  }
});

function BatchLayer({ data, classes }) {
  const dataLabels = [
    {
      label: "Candle hash id",
      value: data.candleHashId
    },
    {
      label: "Prepped weight",
      value: data.preppedContainerWeightOunces,
      unit: "oz"
    },
    {
      label: "Container temp",
      value: data.containerTemperatureFahrenheit,
      unit: "°F"
    },
    {
      label: "Room temp",
      value: data.coolingRoomTemperatureFahrenheit,
      unit: "°F"
    },
    {
      label: "Room humidity",
      value: data.coolingRoomHumidityPercent,
      unit: "%"
    },
    {
      label: "When poured",
      value: data.whenPoured
    }
  ];
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.headingHash} color="textSecondary">
          {`${data.hashId}`}
        </Typography>
        <Typography className={classes.headingName}>
          {`Layer in `}
          <Link to={`/${data.candleHashId}`}>{`Candle ${
            data.candleHashId
          }`}</Link>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <ol className={classes.candleDetails}>
          {dataLabels.map(d => (
            <DataLabel
              key={d.label}
              label={d.label}
              value={d.value}
              unit={d.unit}
            />
          ))}
        </ol>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default withStyles(styles)(BatchLayer);
