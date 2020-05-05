import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddComponentDialog from "./AddComponentDialog";
import BurnTimeDialog from "./BurnTimeDialog";
import BurnSummaryDialog from "./BurnSummaryDialog";

import { withStyles } from "@material-ui/core/styles";

import DataLabel from "./DataLabel";
import TempCandleComponent from "./TempCandleComponent";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  textField: {
    marginTop: "1em",
  },
  headingHash: {
    flexBasis: "7%",
  },
  headingName: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: "33%",
  },
  subHeading: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    position: "relative",
  },
  candleDetails: {
    paddingBottom: theme.spacing(2),
  },
  itemDetails: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  itemType: {
    fontSize: 12,
  },
  secondaryInfo: {
    fontSize: 12,
  },
  itemPrice: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingRight: theme.spacing(2),
  },
  expansionPanelDetails: {
    flexFlow: "column nowrap",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  burnSummary: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
});

function Candle({
  data,
  editable,
  onFormValueChange,
  onUpdateCandle,
  onAddComponent,
  onAddBurn,
  updateDisabled,
  clientSideBurns,
  clientSideData,
  classes,
}) {
  console.log("CANDLE DATA: ", data);
  const [componentDialogOpen, setComponentDialogOpen] = useState(false);
  const [newBurnDialogOpen, setNewBurnDialogOpen] = useState(false);
  const [burnSummaryDialogOpen, setBurnSummaryDialogOpen] = useState(false);

  const handleAddComponent = ({ itemType, hashId, finished }) => {
    onAddComponent({
      [`${itemType}HashId`]: hashId,
      [`${itemType}Finished`]: finished,
    });
    setComponentDialogOpen(false);
  };

  const handleAddBurn = ({
    id,
    whenStarted,
    whenStopped,
    stoppedWeightOunces,
    finished,
    notes,
  }) => {
    onAddBurn({
      id,
      whenStarted,
      whenStopped,
      stoppedWeightOunces,
      finished,
      notes,
    });
    setNewBurnDialogOpen(false);
  };

  const handleCloseAddComponentDialog = () => {
    setComponentDialogOpen(false);
  };

  const handleCloseBurnDialog = () => {
    setNewBurnDialogOpen(false);
  };
  const handleCloseBurnSummaryDialog = () => {
    setBurnSummaryDialogOpen(false);
  };

  const renderLid = () => {
    if (!clientSideData.lidHashId && !data.lidHashId) {
      return false;
    }
    if (clientSideData.lidHashId) {
      return (
        <Grid item xs={4} lg={3}>
          <TempCandleComponent type="Lid" hashId={clientSideData.lidHashId} />
        </Grid>
      );
    }
    return (
      <Grid item xs={4} lg={3}>
        <Paper className={classes.paper}>
          <div className={classes.itemDetails}>
            <Typography
              className={classes.itemType}
              color="textSecondary"
              align="center"
              gutterBottom
            >
              Lid
            </Typography>
            <Typography variant="subtitle1">{data.lidName}</Typography>
            <Typography className={classes.secondaryInfo} color="textSecondary">
              {data.lidColor}
            </Typography>
          </div>
          <Typography
            className={classes.itemPrice}
            variant="subtitle1"
            align="right"
          >
            {`$${data.lidCalculatedCosts.totalCost}`}
          </Typography>
        </Paper>
      </Grid>
    );
  };
  const renderWarningLabel = () => {
    if (!clientSideData.warningLabelHashId && !data.warningLabelHashId) {
      return false;
    }
    if (clientSideData.warningLabelHashId) {
      return (
        <Grid item xs={4} lg={3}>
          <TempCandleComponent
            type="Warning label"
            hashId={clientSideData.warningLabelHashId}
          />
        </Grid>
      );
    }
    return (
      <Grid item xs={4} lg={3}>
        <Paper className={classes.paper}>
          <div className={classes.itemDetails}>
            <Typography
              className={classes.itemType}
              color="textSecondary"
              align="center"
              gutterBottom
            >
              Warning Label
            </Typography>
            <Typography variant="subtitle1">{data.warningLabelName}</Typography>
            <Typography className={classes.secondaryInfo} color="textSecondary">
              {data.warningLabelColor}
            </Typography>
          </div>
          <Typography
            className={classes.itemPrice}
            variant="subtitle1"
            align="right"
          >
            {`$${data.warningLabelCalculatedCosts.totalCost}`}
          </Typography>
        </Paper>
      </Grid>
    );
  };
  const renderBox = () => {
    if (!clientSideData.boxHashId && !data.boxHashId) {
      return false;
    }
    if (clientSideData.boxHashId) {
      return (
        <Grid item xs={4} lg={3}>
          <TempCandleComponent type="Box" hashId={clientSideData.boxHashId} />
        </Grid>
      );
    }
    return (
      <Grid item xs={4} lg={3}>
        <Paper className={classes.paper}>
          <div className={classes.itemDetails}>
            <Typography
              className={classes.itemType}
              color="textSecondary"
              align="center"
              gutterBottom
            >
              Box
            </Typography>
            <Typography variant="subtitle1">{data.boxName}</Typography>
          </div>
          <Typography
            className={classes.itemPrice}
            variant="subtitle1"
            align="right"
          >
            {`$${data.boxCalculatedCosts.totalCost}`}
          </Typography>
        </Paper>
      </Grid>
    );
  };

  const getWickDescription = () => {
    let wickSeries = "";
    let wickSize = "";

    // handle null values with empty strings
    if (data.wickSeries) {
      wickSeries = data.wickSeries;
    }

    if (data.wickSize) {
      wickSize = data.wickSize;
    }

    if (wickSeries && wickSize) {
      return `${wickSeries}-${wickSize}`;
    }
    return wickSeries || wickSize;
  };

  return (
    <div className={classes.root}>
      <BurnTimeDialog
        onClose={handleCloseBurnDialog}
        onSubmit={handleAddBurn}
        isOpen={newBurnDialogOpen}
      />

      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.headingHash} color="textSecondary">
            {`${data.hashId}`}
          </Typography>
          <Typography className={classes.headingName}>
            Container Details
          </Typography>
          <Typography
            className={classes.subHeading}
            color="textSecondary"
            align="right"
          >
            {`$${data.calculatedCosts.productCost} / $${data.calculatedCosts.shippingCost} / $${data.calculatedCosts.totalCost}`}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <form onSubmit={onUpdateCandle}>
            <Grid container justify="center">
              <Grid item xs={12} sm={10} md={6}>
                <div className={classes.candleDetails}>
                  {editable && (
                    <DataLabel
                      editable={editable}
                      name="name"
                      label="Name"
                      value={data.name}
                      autoFocus
                      onChange={onFormValueChange}
                    />
                  )}
                  <DataLabel
                    label="Pour Weight"
                    value={data.pourWeightOunces}
                    unit="oz"
                  />
                  <DataLabel
                    label="Calculated Volume"
                    value={data.calculatedVolumePouredOunces}
                    unit="fl. oz"
                  />
                  <DataLabel
                    label="Completed Weight"
                    name="completedCandleWeightOunces"
                    value={data.completedCandleWeightOunces || ""}
                    unit="oz"
                    editable={editable}
                    onChange={onFormValueChange}
                  />
                  <DataLabel
                    label="Volume Overflow Percent"
                    name="volumeOverflowPercent"
                    value={data.volumeOverflowPercent || ""}
                    unit="%"
                    editable={editable}
                    onChange={onFormValueChange}
                  />
                  <DataLabel
                    editable={editable}
                    label="Color"
                    name="colorDescription"
                    value={data.colorDescription || ""}
                    onChange={onFormValueChange}
                  />
                  {!!data.burnTimeToDateHours && (
                    <DataLabel
                      label="Burn time"
                      value={data.burnTimeToDateHours}
                      unit="hrs"
                    />
                  )}

                  {!!data.owner && (
                    <DataLabel label="Owner" value={data.owner} />
                  )}

                  <DataLabel
                    label="Finished burning"
                    value={!!data.finished ? "true" : "false"}
                  />
                  <DataLabel
                    editable={editable}
                    multiline
                    label="Notes"
                    name="notes"
                    value={data.notes || ""}
                    onChange={onFormValueChange}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={10} md={6}>
                {editable && (
                  <div className={classes.actions}>
                    <div>
                      <Button
                        color="primary"
                        onClick={() => setComponentDialogOpen(true)}
                      >
                        Add Component
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => setNewBurnDialogOpen(true)}
                      >
                        Add Burn
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={updateDisabled}
                    >
                      Update
                    </Button>
                  </div>
                )}
                {!data.burnHistory.length && (
                  <Typography className={classes.burnSummary}>
                    No burns recorded
                  </Typography>
                )}
                {data.burnHistory.length && (
                  <div className={classes.burnSummary}>
                    <div>
                      <Typography variant="body1" align="right">{`${
                        data.burnHistory.length
                      } burn${
                        data.burnHistory.length !== 1 ? "s" : ""
                      } recorded`}</Typography>
                      <Typography variant="body1" align="right">{`${
                        clientSideBurns.length
                      } burn${
                        clientSideBurns.length !== 1 ? "s" : ""
                      } pending`}</Typography>
                      <Button
                        color="secondary"
                        onClick={() => setBurnSummaryDialogOpen(true)}
                      >
                        Show Burns
                      </Button>
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
          </form>

          <Grid container justify="center" spacing={8}>
            <Grid item xs={4} lg={3}>
              <Paper className={classes.paper}>
                <div className={classes.itemDetails}>
                  <Typography
                    className={classes.itemType}
                    color="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    Jar
                  </Typography>
                  <Typography variant="subtitle1">{data.jarName}</Typography>
                  <Typography
                    className={classes.secondaryInfo}
                    color="textSecondary"
                  >
                    {data.jarColor}
                  </Typography>
                </div>
                <Typography
                  className={classes.itemPrice}
                  variant="subtitle1"
                  align="right"
                >
                  {`$${data.jarCalculatedCosts.totalCost}`}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4} lg={3}>
              <Paper className={classes.paper}>
                <div className={classes.itemDetails}>
                  <Typography
                    className={classes.itemType}
                    color="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    Wick
                  </Typography>
                  <Typography variant="subtitle1">
                    {`${data.wickCount} ${getWickDescription()} wick${
                      data.wickCount === 1 ? "" : "s"
                    }`}
                  </Typography>
                  <Typography
                    className={classes.secondaryInfo}
                    color="textSecondary"
                  >{`${data.wickLayout} wick layout`}</Typography>
                </div>
                <Typography
                  className={classes.itemPrice}
                  variant="subtitle1"
                  align="right"
                >
                  {`$${data.wickCalculatedCosts.totalCost}`}
                </Typography>
              </Paper>
            </Grid>
            {renderLid()}
            <Grid item xs={4} lg={3}>
              <Paper className={classes.paper}>
                <div className={classes.itemDetails}>
                  <Typography
                    className={classes.itemType}
                    color="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    Wick Sticker
                  </Typography>
                  <Typography variant="subtitle1">
                    {data.wickStickerName}
                  </Typography>
                </div>
                <Typography
                  className={classes.itemPrice}
                  variant="subtitle1"
                  align="right"
                >
                  {`$${data.wickStickerCalculatedCosts.totalCost}`}
                </Typography>
              </Paper>
            </Grid>
            {renderWarningLabel()}
            {renderBox()}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <AddComponentDialog
        isOpen={componentDialogOpen}
        onClose={handleCloseAddComponentDialog}
        onSubmit={handleAddComponent}
      />
      <BurnSummaryDialog
        onClose={handleCloseBurnSummaryDialog}
        isOpen={burnSummaryDialogOpen}
        burns={data.burnHistory}
        pendingBurns={clientSideBurns}
      />
    </div>
  );
}

export default withStyles(styles)(Candle);
