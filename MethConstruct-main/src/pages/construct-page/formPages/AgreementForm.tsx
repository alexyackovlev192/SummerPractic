import React from "react";
import Typography from "@mui/material/Typography";
import { TextField, Box } from "@mui/material";
import { FormWrapper } from "./FormWrapper";

type TAgreementData = {
  protocol: string;
  date: string;
  surname: string;
  name: string;
  fName: string;
};

type TAgreementFormProps = TAgreementData & {
  updateFields: (fields: Partial<TAgreementData>) => void;
};

export function AgreementForm({
  protocol,
  date,
  surname,
  name,
  fName,
  updateFields,
}: TAgreementFormProps) {
  return (
    <FormWrapper title="Лист согласования">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="body2"
          className="inputTypo"
          style={{ width: "70%" }}
        >
          Программа рассмотрена на заседании кафедры:
        </Typography>
        <TextField
          // required
          id="outlined"
          //disabled
          variant="outlined"
          value={protocol}
          onChange={(e) => updateFields({ protocol: e.target.value })}
          style={{ width: "70%" }}
        />

        <Typography
          variant="body2"
          className="inputTypo"
          style={{ width: "70%" }}
        >
          Введите номер протокола
        </Typography>
        <TextField
          // required
          //disabled
          id="outlined"
          variant="outlined"
          value={date}
          onChange={(e) => updateFields({ date: e.target.value })}
          style={{ width: "70%" }}
        />
        <Typography
          variant="body2"
          className="inputTypo"
          style={{ width: "70%" }}
        >
          Фамилия эксперта
        </Typography>
        <TextField
          // required
          //disabled
          variant="outlined"
          id="outlined"
          value={surname}
          onChange={(e) => updateFields({ surname: e.target.value })}
          style={{ width: "70%" }}
        />
        <Typography
          variant="body2"
          className="inputTypo"
          style={{ width: "70%" }}
        >
          Имя эксперта
        </Typography>
        <TextField
          // required
          //disabled
          id="outlined"
          variant="outlined"
          value={name}
          onChange={(e) => updateFields({ name: e.target.value })}
          style={{ width: "70%" }}
        />
        <Typography
          variant="body2"
          className="inputTypo"
          style={{ width: "70%" }}
        >
          Отчество эксперта
        </Typography>
        <TextField
          //disabled
          // required
          id="outlined"
          variant="outlined"
          value={fName}
          onChange={(e) => updateFields({ fName: e.target.value })}
          style={{ width: "70%" }}
        />
      </Box>
    </FormWrapper>
  );
}
