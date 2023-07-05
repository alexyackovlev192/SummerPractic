import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Box, TableSortLabel } from "@mui/material";
import { mockRowData } from "./mockData";

import "./directions-page.css";

type TrowData = {
  id: number;
  programm: string;
  code: string;
  recYear: number;
  educLvl: string;
  educDir: string;
};

type TOrder = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: TOrder,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const sortedRowInformation = <T,>(
  rowArray: readonly T[],
  comparator: (a: T, b: T) => number
) => {
  const stabilizedRowArray = rowArray.map(
    (el: any, index: any) => [el, index] as [T, number]
  );
  stabilizedRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedRowArray.map((el) => el[0]);
};

const Directions: React.FC = () => {
  const [orderDirection, setOrderDirection] = useState<TOrder>("asc");
  const [orderBy, setOrderBy] = useState("programm");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TrowData
  ) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderBy(property);
    setOrderDirection(isAsc ? "desc" : "asc");
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="educ-page">
      <div className="padClass">
        <Typography className="planText" variant="h5">
          Направления
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%" }}>
            <TableContainer>
              <Table>
                <TableHead style={{ backgroundColor: "#1D51A3" }}>
                  <TableRow>
                    <TableCell key="programm">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "programm"}
                        direction={
                          orderBy === "programm" ? orderDirection : "asc"
                        }
                        onClick={(event) =>
                          handleRequestSort(event, "programm")
                        }
                      >
                        Направление
                      </TableSortLabel>
                    </TableCell>
                    <TableCell key="code">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "code"}
                        direction={orderBy === "code" ? orderDirection : "asc"}
                        onClick={(event) => handleRequestSort(event, "code")}
                      >
                        Код направления
                      </TableSortLabel>
                    </TableCell>
                    <TableCell key="recYear">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "recYear"}
                        direction={
                          orderBy === "recYear" ? orderDirection : "asc"
                        }
                        onClick={(event) => handleRequestSort(event, "recYear")}
                      >
                        Год набора
                      </TableSortLabel>
                    </TableCell>
                    <TableCell key="educLvl">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "educLvl"}
                        direction={
                          orderBy === "educLvl" ? orderDirection : "asc"
                        }
                        onClick={(event) => handleRequestSort(event, "educLvl")}
                      >
                        Уровень образования
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {sortedRowInformation(
                  mockRowData,
                  getComparator(orderDirection, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.programm}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.recYear}</TableCell>
                      <TableCell>{row.educLvl}</TableCell>
                      {/* <TableCell>{row.educDir}</TableCell> */}
                    </TableRow>
                  ))}
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={mockRowData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default Directions;
