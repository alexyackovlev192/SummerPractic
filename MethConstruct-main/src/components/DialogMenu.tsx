import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { mockRowData } from "../pages/directions-page/mockData";

type TDialogMenuProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, string>) => void;
};






const DialogMenu: React.FC<TDialogMenuProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [textFieldValues, setTextFieldValues] = useState<
    Record<string, string>
  >({
    rpdName: "",
    direction: "",
    code: "",
    educLvl: "",
    educForm: "",
  });

  const handleTextFieldChange = (name: string, value: string) => {
    setTextFieldValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectorChange = (event: SelectChangeEvent) => {
    const { value, name } = event.target;
    setTextFieldValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDialogSubmit = () => {
    onSubmit(textFieldValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Создать новую рабочую программу</DialogTitle>
      <DialogContent>
        <Typography className="inputTypo" variant="body2">
          Название рабочей программы
        </Typography>
        <TextField
          value={textFieldValues.rpdName}
          onChange={(event) =>
            handleTextFieldChange("rpdName", event.target.value)
          }
          fullWidth
        />
        <Typography className="inputTypo" variant="body2">
          Направление
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <Select
            fullWidth
            id="direction"
            value={textFieldValues.direction}
            onChange={(event) => handleSelectorChange(event)}
            name="direction"
            label="Направление"
          >
            {Array.from(new Set(mockRowData.map((row) => row.programm))).map(
              (programm) => (
                <MenuItem key={programm} value={programm}>
                  {programm}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <Typography variant="body2" className="inputTypo">
          Код направления
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <Select
            fullWidth
            id="code"
            value={textFieldValues.code}
            onChange={(event) => handleSelectorChange(event)}
            name="code"
            label="Направление"
          >
            {mockRowData
              .filter((row) => row.programm === textFieldValues.direction)
              .map((row) => (
                <MenuItem key={row.id} value={row.code}>
                  {row.code}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Typography variant="body2" className="inputTypo">
          Уровень образования
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <Select
            fullWidth
            id="education-level"
            value={textFieldValues.educLvl}
            onChange={(event) => handleSelectorChange(event)}
            name="educLvl"
            label="Уровень образования"
          >
            <MenuItem value="Магистратура">Магистратура</MenuItem>
            <MenuItem value="Бакалавриат">Бакалавриат</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2" className="inputTypo">
          Форма обучения
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <Select
            fullWidth
            id="education-form"
            value={textFieldValues.educForm}
            onChange={(event) => handleSelectorChange(event)}
            name="educForm"
            label="Форма обучения"
          >
            <MenuItem value="Очная">Очная</MenuItem>
            <MenuItem value="Заочная">Заочная</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отменить</Button>
        <Button onClick={handleDialogSubmit}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMenu;
