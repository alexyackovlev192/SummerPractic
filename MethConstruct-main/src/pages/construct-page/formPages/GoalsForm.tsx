import React from "react";
import Typography from "@mui/material/Typography";
import { TextField, Box } from "@mui/material";
import { FormWrapper } from "./FormWrapper";

type TGoalsData = {
  goals: string;
  tasks: string;
  objectives: string;
};

type TGoalsFormProps = TGoalsData & {
  updateFields: (fields: Partial<TGoalsData>) => void;
};

export function GoalsForm({
  goals,
  tasks,
  objectives,
  updateFields,
}: TGoalsFormProps) {
  return (
    <div style={{ width: "95%" }}>
      <FormWrapper title="Цели, задачи и объекты">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Цели
          </Typography>
          <TextField
            // required
            id="outlined"
            value={goals}
            onChange={(e) => updateFields({ goals: e.target.value })}
            style={{ width: "95%" }}
            multiline
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Задачи
          </Typography>
          <TextField
            // required
            id="outlined"
            value={tasks}
            onChange={(e) => updateFields({ tasks: e.target.value })}
            style={{ width: "95%" }}
            multiline
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Объекты профессиональной деятельности
          </Typography>
          <TextField
            // required
            id="outlined"
            value={objectives}
            onChange={(e) => updateFields({ objectives: e.target.value })}
            style={{ width: "95%" }}
            multiline
          />
        </Box>
      </FormWrapper>
    </div>
  );
}
