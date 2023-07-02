import React from "react";
import Typography from "@mui/material/Typography";
import { TextField, Box, FormControl, Select, MenuItem } from "@mui/material";
import { FormWrapper } from "./FormWrapper";

type TOpopPlaceData = {
  disciplinePlace: string;
  semester: string | number;
  course: string | number;
};

type TOpopPlaceFormProps = TOpopPlaceData & {
  updateFields: (fields: Partial<TOpopPlaceData>) => void;
};

export function OpopPlaceForm({
  disciplinePlace,
  semester,
  course,
  updateFields,
}: TOpopPlaceFormProps) {
  const renderSemesterOptions = () => {
    switch (course) {
      case "1":
        return [
          <MenuItem key={1} value={1}>
            1
          </MenuItem>,
          <MenuItem key={2} value={2}>
            2
          </MenuItem>,
        ];
      case "2":
        return [
          <MenuItem key={3} value={3}>
            3
          </MenuItem>,
          <MenuItem key={4} value={4}>
            4
          </MenuItem>,
        ];
      case "3":
        return [
          <MenuItem key={5} value={5}>
            5
          </MenuItem>,
          <MenuItem key={6} value={6}>
            6
          </MenuItem>,
        ];
      case "4":
        return [
          <MenuItem key={7} value={7}>
            7
          </MenuItem>,
          <MenuItem key={8} value={8}>
            8
          </MenuItem>,
        ];
      default:
        return null;
    }
  };

  return (
    <>
      <FormWrapper title="Место дисциплины">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "70%" }}
          >
            Место дисциплины
          </Typography>
          <Select
            disabled
            style={{ width: "70%" }}
            id="education-form"
            value={disciplinePlace}
            onChange={(e) => updateFields({ disciplinePlace: e.target.value })}
            name="educationForm"
            label="Форма обучения"
          >
            <MenuItem value="Обязательная часть">Обязательная часть</MenuItem>
            <MenuItem value="Вариативная часть">Вариативная часть</MenuItem>
            <MenuItem value="Дисциплины по выбору">
              Дисциплины по выбору
            </MenuItem>
          </Select>

          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "70%" }}
          >
            Курс прохождения дисциплины
          </Typography>

          <FormControl sx={{ width: "70%" }}>
            <Select
              disabled
              fullWidth
              id="education-form"
              value={course}
              onChange={(e) => updateFields({ course: e.target.value })}
              name="educationForm"
              label="Форма обучения"
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
          </FormControl>

          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "70%" }}
          >
            Семестр прохождения дисциплины
          </Typography>

          <FormControl sx={{ width: "70%" }}>
            <Select
              disabled
              fullWidth
              id="education-form"
              value={semester}
              onChange={(e) => updateFields({ semester: e.target.value })}
              name="Semester"
              label="Форма обучения"
            >
              {renderSemesterOptions()}
            </Select>
          </FormControl>
        </Box>
      </FormWrapper>
    </>
  );
}
