import React from "react";
import Typography from "@mui/material/Typography";
import { TextField, Box } from "@mui/material";
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

  
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   try {
  //     const data = await postData("http://localhost/summerpractic/konstructor/api/getRpd", "GET");
  //     console.log(data);
  //     if (data.length > 0) {
  //       const mockList = data[0]; // Предполагаем, что данные находятся в первом элементе массива
  //       console.log(mockList);
  //       updateFields({
  //         semester: mockList.semester,
  //         course: mockList.course,
  //         disciplinePlace: mockList.disciplinePlace,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при получении данных:", error);
  //   }
  // }

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
          <TextField
            required
            id="outlined-required"
            value={disciplinePlace}
            disabled={true}
            onChange={(e) => updateFields({ course: e.target.value })}
            style={{ width: "70%" }}
          />

          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "70%" }}
          >
            Курс прохождения дисциплины
          </Typography>
          <TextField
            required
            id="outlined-required"
            value={course}
            disabled={true}
            onChange={(e) => updateFields({ course: e.target.value })}
            style={{ width: "70%" }}
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "70%" }}
          >
            Семестр прохождения дисциплины
          </Typography>

          <TextField
            required
            id="outlined-required"
            value={semester}
            disabled={true}
            onChange={(e) => updateFields({ semester: e.target.value })}
            style={{ width: "70%" }}
          />
        </Box>
      </FormWrapper>
    </>
  );
}
