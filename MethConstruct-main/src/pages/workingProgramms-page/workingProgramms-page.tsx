import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import EditIcon from "@mui/icons-material/Edit";
import DialogActions from "@mui/material/DialogActions";
import TablePagination from "@mui/material/TablePagination";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, IconButton, TableSortLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { mockWorkRowData } from "./mockWorkData";
//import { mockRpd } from "./MockObject";
// import educData from "./educData.json"
import DialogMenu from "../../components/DialogMenu";
import { useNavigate } from "react-router-dom";

import "./workingProgramms-page.css";

// Example POST method implementation:
async function postData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.

  });
  return Promise.resolve(response.json()); // parses JSON response into native JavaScript objects
}

const WorkingProgramms: React.FC = () => {
  const [mockRpd, setMockRpd] = useState<any[]>([]);

  useEffect(() => {
    postData("http://localhost/summerpractic/konstructor/api/getRpd")
      .then((data) => {
        setMockRpd(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        // Обработка ошибки
      });
  }, []);

  type TrowData = {
    ID: string;
    rpdName: string;
    code: string;
    educLvl: string;
    authors: string;
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
  
  const modifiedMockRpd = mockRpd.map((item) => {
    const { ID, rpdName, code, educLvl, surname, name, fName } = item;
  
    const authors = `${surname} ${name} ${fName}`;
  
    return {
      ID,
      rpdName,
      code,
      educLvl,
      authors,
    };
  });


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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rpdOpen, setRpdOpen] = React.useState(false);
  const [isRpdBasedOnRpdOpen, setisRpdBasedOnRpdOpen] = useState(false);

  const handleRpdOpenDialog = () => {
    setRpdOpen(true);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setRpdOpen(false);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOpenRpdBasedDialog = () => {
    setRpdOpen(false);
    setisRpdBasedOnRpdOpen(true);
  };

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleDialogSubmit = (values: Record<string, string>) => {
    setFormValues(values);
    setIsDialogOpen(false);
    navigate("/constructor", { state: { formValues: values } });
  };

  const handleRpdEdit = (id: string) => {
    const targetRpd = mockRpd.find((rpd: any) => rpd.ID === id);
    navigate("/constructor", { state: { formValues: targetRpd } });
  };

  const [selectedRpdName, setSelectedRpdName] = useState({
    rpdName: "",
    ID: "",
  });

  return (
    <div className="workingProgramms-page">
      <div className="padClass">
        <Typography className="planText" variant="h5">
          Рабочие программы дисциплин
        </Typography>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Paper sx={{ width: "100%" }}>
            <TableContainer>
              <Table>
                <TableHead style={{ backgroundColor: "#1D51A3" }}>
                  <TableRow>
                    <TableCell key="ID">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "ID"}
                        direction={orderBy === "ID" ? orderDirection : "asc"}
                        onClick={(event) => handleRequestSort(event, "ID")}
                      >
                        ID
                      </TableSortLabel>
                    </TableCell>
                    <TableCell key="code">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "code"}
                        direction={orderBy === "code" ? orderDirection : "asc"}
                        onClick={(event) => handleRequestSort(event, "code")}
                      >
                        Код
                      </TableSortLabel>
                    </TableCell>
                    <TableCell key="rpdName">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "rpdName"}
                        direction={
                          orderBy === "rpdName" ? orderDirection : "asc"
                        }
                        onClick={(event) => handleRequestSort(event, "rpdName")}
                      >
                        Название
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
                    <TableCell key="authors">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "authors"}
                        direction={
                          orderBy === "authors" ? orderDirection : "asc"
                        }
                        onClick={(event) => handleRequestSort(event, "authors")}
                      >
                        Авторы
                      </TableSortLabel>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                {sortedRowInformation(
                  modifiedMockRpd,
                  getComparator(orderDirection, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.ID}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.rpdName}</TableCell>
                      <TableCell>{row.educLvl}</TableCell>
                      <TableCell>{row.authors} </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            handleRpdEdit(String(row.ID));
                          }}
                        >
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={mockRpd.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <div style={{ position: "sticky", bottom: "20px", zIndex: 1 }}>
            <IconButton
              size="large"
              sx={{ fontSize: "2rem", padding: "16px" }}
              style={{
                position: "relative",
                float: "right",
                marginRight: "20px",
              }}
              onClick={handleRpdOpenDialog}
            >
              <AddCircleIcon
                sx={{ fontSize: "2.5rem" }}
                fontSize="large"
                color="primary"
              />
            </IconButton>
          </div>
          <DialogMenu
            open={isDialogOpen}
            onClose={handleCloseDialog}
            onSubmit={handleDialogSubmit}
          />

          <Dialog
            open={rpdOpen}
            onClose={() => setRpdOpen(false)}
            sx={{ minWidth: "50%" }}
          >
            <DialogTitle>
              Создать новую рабочую программу дисциплины
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleOpenRpdBasedDialog}>
                На основе существующей РПД
              </Button>
              <Button onClick={handleOpenDialog}>
                На основе данных из учебного плана
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={isRpdBasedOnRpdOpen}
            onClose={() => setisRpdBasedOnRpdOpen(false)}
            sx={{ minWidth: "50%" }}
          >
            <DialogTitle>
              Создать новую рабочую программу дисциплины
            </DialogTitle>
            <DialogContent>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  fullWidth
                  id="chosenRpd"
                  value={selectedRpdName.rpdName}
                  onChange={(event) =>
                    setSelectedRpdName({
                      ID:
                        modifiedMockRpd.find(
                          (item) => item.rpdName === event.target.value
                        )?.ID || "",
                      rpdName: event.target.value,
                    })
                  }
                  name="direction"
                  label="Направление"
                >
                  {modifiedMockRpd.map((item) => (
                    <MenuItem key={item.ID} value={item.rpdName}>
                      {item.rpdName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                fullWidth
                onClick={() => handleRpdEdit(selectedRpdName.ID)}
              >
                Перейти к конструктору
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </div>
  );
};

export default WorkingProgramms;
