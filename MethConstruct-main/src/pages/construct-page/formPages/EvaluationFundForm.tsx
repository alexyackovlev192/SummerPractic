import React from "react";
import { Typography, TextField, Box } from "@mui/material";
import { FormWrapper } from "./FormWrapper";

type TEvaluationFundData = {
  fundList: string;
};

type TEvaluationFundFormProps = TEvaluationFundData & {
  updateFields: (fields: Partial<TEvaluationFundData>) => void;
};

export function EvaluationFundForm({
  fundList,
  updateFields,
}: TEvaluationFundFormProps) {
  return (
    <div style={{ width: "95%" }}>
      <FormWrapper title="Фонды оценочных средств">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Фонды оценочных средств
          </Typography>
          <TextField
            id="creditUnits"
            multiline
            value={fundList}
            onChange={(e) => updateFields({ fundList: e.target.value })}
            style={{ width: "95%" }}
          />
        </Box>
      </FormWrapper>
    </div>
  );
}
