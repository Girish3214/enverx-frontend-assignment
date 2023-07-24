import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TableSortLabel } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  transition: "all 1s ease-in-out",

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  ["&:hover"]: {
    backgroundColor: "none",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (parseInt(b[orderBy]) || parseInt(a[orderBy])) {
    if (parseInt(b[orderBy]) < parseInt(a[orderBy])) {
      return 1;
    } else if (parseInt(b[orderBy]) > parseInt(a[orderBy])) {
      return -1;
    }
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function DataTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("description");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(
    () => stableSort(props.data, getComparator(order, orderBy)),
    [order, orderBy]
  );

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.header.map((title) => (
              <StyledTableCell key={title.label}>
                <TableSortLabel
                  active={orderBy === title.key}
                  direction={orderBy === title.key ? order : "asc"}
                  onClick={(e) => handleRequestSort(event, title.key)}
                >
                  {title.label}
                </TableSortLabel>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((row) => (
            <StyledTableRow key={row.description}>
              <StyledTableCell scope="row">{row.description}</StyledTableCell>
              <StyledTableCell>{row.category}</StyledTableCell>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell>{row.amount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
