import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    IconButton,
    TableSortLabel,
  } from '@mui/material';

function CallerTableHeader(props) {

    const { valueToOrderBy, orderDirection, handleRequestSort } = props

    const createSortHandler = (property) => (event)=> {

        handleRequestSort(event, property)
    }




  return (
    <TableHead>
        <TableRow style={{ backgroundColor: '#f5f5f5' }}>
            <TableCell>
                <TableSortLabel
                active={valueToOrderBy === "name"}
                direction={valueToOrderBy === "name" ? orderDirection : 'asc'}
                onClick={createSortHandler("name")}
                >
                    Name
                </TableSortLabel>
            </TableCell>
            <TableCell>
                <TableSortLabel
                active={valueToOrderBy === "description"}
                direction={valueToOrderBy === "description" ? orderDirection : 'asc'}
                onClick={createSortHandler("description")}
                >
                    Description
                </TableSortLabel>
            </TableCell>
            <TableCell>
                <TableSortLabel
                active={valueToOrderBy === "phoneNumber"}
                direction={valueToOrderBy === "phoneNumber" ? orderDirection : 'asc'}
                onClick={createSortHandler("phoneNumber")}
                >
                    Phone Number
                </TableSortLabel>
            </TableCell>
            <TableCell></TableCell>
        </TableRow>
    </TableHead>
  )
}

export default CallerTableHeader