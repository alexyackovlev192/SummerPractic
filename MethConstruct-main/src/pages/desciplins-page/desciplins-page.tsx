import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Box, TableSortLabel } from "@mui/material";

import "./directions-page.css";
import  postData from "../postData.js"


const Directions: React.FC = () => {
  const [mockDir, setMockDir] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await postData("http://localhost/summerpractic/konstructor/api/getAllDetail", "GET");
      setMockDir(data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }


  type TrowData = {
    ID: number;
    rpdName: string;
    code: string;
    year: number;
    educlvl: string;
    educForm: string;
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

  const modifiedMockDir = mockDir.map((item) => {
    const { ID, rpdName, code, year, educlvl, educForm} = item;
  
    return {
      ID,
      rpdName,
      code,
      year,
      educlvl,
      educForm
    };
  });



  const [orderDirection, setOrderDirection] = useState<TOrder>("asc");
  const [orderBy, setOrderBy] = useState("rpdName");
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
          Дисциплины
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%" }}>
            <TableContainer>
              <Table>
                <TableHead style={{ backgroundColor: "#1D51A3" }}>
                  <TableRow>
                    <TableCell key="rpdName">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "rpdName"}
                        direction={
                          orderBy === "rpdName" ? orderDirection : "asc"
                        }
                        onClick={(event) =>
                          handleRequestSort(event, "rpdName")
                        }
                      >
                        Дисциплина
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
                    <TableCell key="year">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "year"}
                        direction={
                          orderBy === "year" ? orderDirection : "asc"
                        }
                        onClick={(event) => handleRequestSort(event, "year")}
                      >
                        Год
                      </TableSortLabel>
                    </TableCell>
                    <TableCell key="educlvl">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "educlvl"}
                        direction={
                          orderBy === "educlvl" ? orderDirection : "asc"
                        }
                        onClick={(event) => handleRequestSort(event, "educlvl")}
                      >
                        Форма
                      </TableSortLabel>
                    </TableCell>
                    <TableCell key="educForm">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "educForm"}
                        direction={
                          orderBy === "educForm" ? orderDirection : "asc"
                        }
                        onClick={(event) => handleRequestSort(event, "educForm")}
                      >
                        Уровень
                      </TableSortLabel>
                    </TableCell>
                    
                  </TableRow>
                </TableHead>
                {sortedRowInformation(
                  modifiedMockDir,
                  getComparator(orderDirection, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.rpdName}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.year}</TableCell>
                      <TableCell>{row.educForm}</TableCell>
                      <TableCell>{row.educlvl}</TableCell>
                      
                                                                  
                    </TableRow>
                  ))}
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={mockDir.length}
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
