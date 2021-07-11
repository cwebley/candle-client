import React from "react";
import PropTypes from "prop-types";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

const headCells = [
  {
    id: "hashId",
    numeric: false,
    disablePadding: true,
    label: "Hash ID",
  },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "finished", numeric: false, disablePadding: false, label: "Finished" },
];

function EnhancedTableHead({
  classes,
  onSelectAllClick,
  //   order,
  //   orderBy,
  numSelected,
  rowCount,
  //   onRequestSort,
}) {
  // const createSortHandler = (property) => (event) => {
  // //   onRequestSort(event, property);
  // };

  console.log("ROW COUNT : ", rowCount, " NUM SELECTEDD: ", numSelected);
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "Select candles to edit" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
            {/* <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  //   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  //   orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
