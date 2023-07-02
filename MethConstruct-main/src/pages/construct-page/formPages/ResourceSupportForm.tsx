import React from "react";
import Typography from "@mui/material/Typography";
import { TextField, Box } from "@mui/material";
import { FormWrapper } from "./FormWrapper";

type TResourceSupportData = {
  literatureList: string;
  periodicalsList: string;
  internetResList: string;
  infoTechResList: string | null;
  profDataInfList: string;
  reqSoftwareList: string;
  TReqLogistics: TReqLogistics;
};

type TReqLogistics = {
  lecture: string;
  seminars: string;
  disabled: string;
};

type TResourceSupportFormProps = TResourceSupportData & {
  updateFields: (fields: Partial<TResourceSupportData>) => void;
};

export function ResourceSupportForm({
  literatureList,
  periodicalsList,
  internetResList,
  infoTechResList,
  profDataInfList,
  reqSoftwareList,
  TReqLogistics,
  updateFields,
}: TResourceSupportFormProps) {
  return (
    <div style={{ width: "95%" }}>
      <FormWrapper title="Ресурсное обеспечение">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Перечень литературы
          </Typography>
          <TextField
            // required
            id="outlined"
            value={literatureList}
            onChange={(e) => updateFields({ literatureList: e.target.value })}
            style={{ width: "95%" }}
            multiline
          />

          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Периодические издания
          </Typography>
          <TextField
            // required
            id="outlined"
            value={periodicalsList}
            onChange={(e) => updateFields({ periodicalsList: e.target.value })}
            style={{ width: "95%" }}
            multiline
          />

          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Перечень ресурсов информационно-телекоммуникационной сети «Интернет»
          </Typography>
          <TextField
            // required
            id="outlined"
            value={internetResList}
            onChange={(e) => updateFields({ internetResList: e.target.value })}
            style={{ width: "95%" }}
            multiline
          />

          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Перечень информационных технологий, используемых при осуществлении
            образовательного процесса, включая программное обеспечение,
            информационные справочные системы (при необходимости)
          </Typography>
          <TextField
            // required
            id="outlined"
            value={infoTechResList}
            onChange={(e) => updateFields({ infoTechResList: e.target.value })}
            style={{ width: "95%" }}
            multiline
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Профессиональные базы данных и информационные справочные системы
          </Typography>
          <TextField
            // required
            id="outlined"
            value={profDataInfList}
            onChange={(e) => updateFields({ profDataInfList: e.target.value })}
            style={{ width: "95%" }}
            multiline
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Необходимое программное обеспечение
          </Typography>
          <TextField
            // required
            id="outlined"
            value={reqSoftwareList}
            onChange={(e) => updateFields({ reqSoftwareList: e.target.value })}
            style={{ width: "95%" }}
            multiline
          />
          <Typography
            variant="body2"
            sx={{ p: "16px 0 4px 0", fontSize: "1.2rem" }}
            style={{ width: "95%" }}
          >
            Необходимое материально-техническое обеспечение
          </Typography>
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Необходимое материально-техническое для лекционных занятий
          </Typography>
          <TextField
            // required
            id="outlined"
            value={TReqLogistics.lecture}
            onChange={(e) =>
              updateFields({
                TReqLogistics: {
                  ...TReqLogistics,
                  lecture: e.target.value,
                },
              })
            }
            style={{ width: "95%" }}
            multiline
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Необходимое материально-техническое для семинарских занятий
          </Typography>
          <TextField
            // required
            id="outlined"
            value={TReqLogistics.seminars}
            onChange={(e) =>
              updateFields({
                TReqLogistics: {
                  ...TReqLogistics,
                  seminars: e.target.value,
                },
              })
            }
            style={{ width: "95%" }}
            multiline
          />
          <Typography
            variant="body2"
            className="inputTypo"
            style={{ width: "95%" }}
          >
            Необходимое материально-техническое для лиц с ограничеными
            возможностями здоровья
          </Typography>
          <TextField
            // required
            id="outlined"
            value={TReqLogistics.disabled}
            onChange={(e) =>
              updateFields({
                TReqLogistics: {
                  ...TReqLogistics,
                  disabled: e.target.value,
                },
              })
            }
            style={{ width: "95%" }}
            multiline
          />
        </Box>
      </FormWrapper>
    </div>
  );
}
