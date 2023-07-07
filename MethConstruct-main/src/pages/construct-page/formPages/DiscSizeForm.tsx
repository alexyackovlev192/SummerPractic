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
