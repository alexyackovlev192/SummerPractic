import React from "react";
import { Typography, TextField, Box } from "@mui/material";
import { FormWrapper } from "./FormWrapper";

type TEducMethSupportData = {
  fundList: string;
};

type TEducMethSupportFormProps = TEducMethSupportData & {
  updateFields: (fields: Partial<TEducMethSupportData>) => void;
};

export function EducMethSupportForm({
  fundList,

  updateFields,
}: TEducMethSupportFormProps) {
  return (
    <div style={{ width: "95%" }}>
      <FormWrapper title="Перечень учебно-методического обеспечения">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Перечень учебно-методического обеспечения
          </Typography>
          <TextField
            id="creditUnits"
            multiline
            disabled
            value={fundList}
            onChange={(e) => updateFields({ fundList: e.target.value })}
            style={{ width: "95%" }}
          />
        </Box>
      </FormWrapper>
    </div>
  );
}
