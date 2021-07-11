import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { withRouter, useLocation } from "react-router-dom";
import { withSnackbar } from "notistack";
import qs from "query-string";

import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import EnhancedTableToolbar from "./display-items/EnhancedTableToolbar";
import EnhancedTableHead from "./display-items/EnhancedTableHead";

import { makeStyles } from "@material-ui/styles";
import handleApiError, { currentDate, currentDateTime } from "./utils";
import api from "./api";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
  },
  tableRow: {
    height: "52px",
  },
}));

function RecentCandles({ enqueueSnackbar }) {
  const classes = useStyles();
  const [candleData, setCandleData] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // fetch one time data from the server
  useEffect(() => {
    const fetchCandles = async () => {
      try {
        const result = await axios(api.candlesUrl, {
          params: { incomplete: true },
        });
        if (result.data) {
          setCandleData(result.data);
        }
      } catch (err) {
        handleApiError(err, enqueueSnackbar);
      }
    };

    fetchCandles();
  }, [enqueueSnackbar]);

  const handleSelectAllClick = (event) => {
    const candleHashIdsThisPage = candleData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((c) => c.hashId);
    if (event.target.checked) {
      const newSelecteds = candleHashIdsThisPage.filter((c) => !isSelected(c));
      setSelected((oldSelected) => [...oldSelected, ...newSelecteds]);
      return;
    }
    setSelected((oldSelected) => {
      return oldSelected.filter((c) => {
        return candleHashIdsThisPage.indexOf(c) === -1;
      });
    });
  };

  const handleDeselectAllClick = (event) => {
    setSelected([]);
  };

  const isSelected = (hashId) => selected.indexOf(hashId) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, candleData.length - page * rowsPerPage);

  const handleClick = (event, hashId) => {
    const selectedIndex = selected.indexOf(hashId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, hashId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log("Candles DATA: ", candleData);
  console.log("EMPTY ROWS ", emptyRows);

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          editSelectedLink={`/edit-candles?candles=${selected.join(",")}`}
          numSelected={selected.length}
          onDeselectAll={handleDeselectAllClick}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={
                candleData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((c) => isSelected(c.hashId)).length
              } // on THIS page of results
              // order={order}
              // orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              // onRequestSort={handleRequestSort}
              rowCount={emptyRows === 0 ? rowsPerPage : rowsPerPage - emptyRows}
            />
            <TableBody>
              {candleData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((c, index) => {
                  const isItemSelected = isSelected(c.hashId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, c.hashId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={c.hashId}
                      selected={isItemSelected}
                      className={classes.tableRow}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {c.hashId}
                      </TableCell>
                      <TableCell align="right">{c.name}</TableCell>
                      <TableCell align="right">{c.finished}</TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={candleData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Fragment>
  );
}

export default withSnackbar(RecentCandles);
