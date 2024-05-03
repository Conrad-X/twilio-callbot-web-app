import React from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import {CALLER_NAME,CALLER_DESCRIPTION,CALLER_PHONE_NUMBER,ASC_ORDER} from './callerTableConstants.js';

function CallerTableHeader(props) {
  const { valueToOrderBy, orderDirection, handleRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{ backgroundColor: "#f5f5f5" }}>
        <TableCell>
          <TableSortLabel
            active={valueToOrderBy === CALLER_NAME}
            direction={valueToOrderBy === CALLER_NAME ? orderDirection : ASC_ORDER}
            onClick={createSortHandler(CALLER_NAME)}
          >
            Name
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={valueToOrderBy === CALLER_DESCRIPTION}
            direction={
              valueToOrderBy === CALLER_DESCRIPTION ? orderDirection : ASC_ORDER
            }
            onClick={createSortHandler(CALLER_DESCRIPTION)}
          >
            Description
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={valueToOrderBy === CALLER_PHONE_NUMBER}
            direction={
              valueToOrderBy === CALLER_PHONE_NUMBER ? orderDirection : ASC_ORDER
            }
            onClick={createSortHandler(CALLER_PHONE_NUMBER)}
          >
            Phone Number
          </TableSortLabel>
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

export default CallerTableHeader;
