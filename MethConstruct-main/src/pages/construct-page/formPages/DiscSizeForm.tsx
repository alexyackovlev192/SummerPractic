import React, {useEffect} from "react";
import { Typography, TextField, Box } from "@mui/material";
import { FormWrapper } from "./FormWrapper";
import  postData from "../../postData.js"

type TDiscSizeData = {
  rpdName: string;
  hours: string;
  creditUnits: string;
};

type TDiscSizeFormProps = TDiscSizeData & {
  updateFields: (fields: Partial<TDiscSizeData>) => void;
};

export function DiscSizeForm({
  rpdName,
  hours,
  creditUnits,
  updateFields,
}: TDiscSizeFormProps) {


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await postData("http://localhost/summerpractic/konstructor/api/getDetail/rpdName", "GET");
      if (data.length > 0) {
        const mockCount = data; // Предполагаем, что данные находятся в первом элементе массива
        
        console.log("===" + data);
        
        updateFields({
          rpdName: mockCount.rpdName,
          hours: mockCount.hours,
          creditUnits: mockCount.creditUnits,
        });
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }

  return (
    <div style={{ width: "95%" }}>
      <FormWrapper title="Объем дисциплины">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Зачетные единицы
          </Typography>
          <TextField
            id="creditUnits"
            value={creditUnits}
            disabled
            onChange={(e) => updateFields({ creditUnits: e.target.value })}
            style={{ width: "95%" }}
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Часы
          </Typography>
          <TextField
            id="hours"
            value={hours}
            disabled
            onChange={(e) => updateFields({ hours: e.target.value })}
            style={{ width: "95%" }}
          />
        </Box>
      </FormWrapper>
    </div>
  );
}
