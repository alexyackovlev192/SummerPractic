import React from "react";
import Typography from "@mui/material/Typography";
import { TextField, Box } from "@mui/material";
import { FormWrapper } from "./FormWrapper";

type TTitleData = {
  rpdName: string;
  direction: string;
  code: string;
  educLvl: string;
  educForm: string;
  year: string;
};

type TTitleFormProps = TTitleData & {
  updateFields: (fields: Partial<TTitleData>) => void;
};

export function TitleForm({
  rpdName,
  direction,
  code,
  educLvl,
  educForm,
  year,
  updateFields,
}: TTitleFormProps) {
  return (
    <>
      <FormWrapper title="Титульный лист">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "70%" }}
          >
            Название рабочей программы
          </Typography>
          <TextField
            required
            id="outlined-required"
            value={rpdName}
            disabled={true}
            onChange={(e) => updateFields({ rpdName: e.target.value })}
            style={{ width: "70%" }}
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "70%" }}
          >
            Направление
          </Typography>
          <TextField
            required
            id="outlined-required"
            value={direction}
            disabled={true}
            onChange={(e) => updateFields({ direction: e.target.value })}
            style={{ width: "70%" }}
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "70%" }}
          >
            Код направления
          </Typography>
          <TextField
            required
            id="outlined-required"
            value={code}
            disabled={true}
            onChange={(e) => updateFields({ code: e.target.value })}
            style={{ width: "70%" }}
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "70%" }}
          >
            Уровень образования
          </Typography>
          <TextField
            required
            id="outlined-required"
            value={educLvl}
            disabled={true}
            onChange={(e) => updateFields({ educLvl: e.target.value })}
            style={{ width: "70%" }}
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "70%" }}
          >
            Форма обучения
          </Typography>
          <TextField
            required
            id="outlined-required"
            value={educForm}
            disabled={true}
            onChange={(e) => updateFields({ educForm: e.target.value })}
            style={{ width: "70%" }}
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "70%" }}
          >
            Год
          </Typography>
          <TextField
            required
            id="outlined-required"
            value={year}
            disabled={true}
            onChange={(e) => updateFields({ year: e.target.value })}
            style={{ width: "70%" }}
          />
        </Box>
      </FormWrapper>
    </>
  );
}
