import React from "react";
import { Typography, TextField, Box } from "@mui/material";
import { FormWrapper } from "./FormWrapper";

type TDiscSizeData = {
  hours: string;
  creditUnits: string;
};

type TDiscSizeFormProps = TDiscSizeData & {
  updateFields: (fields: Partial<TDiscSizeData>) => void;
};

export function DiscSizeForm({
  hours,
  creditUnits,
  updateFields,
}: TDiscSizeFormProps) {
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
            onChange={(e) => {
              const value = e.target.value;
              const hours = (parseInt(value) * 60).toString() || "";
              updateFields({ creditUnits: value, hours: hours });
            }}
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
            style={{ width: "95%" }}
          />
        </Box>
      </FormWrapper>
    </div>
  );
}
