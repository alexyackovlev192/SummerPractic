import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { TextField, Box, IconButton } from "@mui/material";
import { FormWrapper } from "./FormWrapper";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";

//Сами элементы компетенций
type TCompetency = {
  id: string;
  code: string;
  name: string;
  achievementIndicators: TAchievementIndicator[];
};
//Индикаторы достижений
type TAchievementIndicator = {
  id: string;
  code: string;
  wording: string;
  knowledges?: string;
  skills?: string;
  masterys?: string;
};
// Массив компетенций
type TCompetencyData = {
  competencies: TCompetency[];
};

type TCompetencyFormProps = TCompetencyData & {
  updateFields: (fields: Partial<TCompetencyData>) => void;
};

const FIELD_NAMES = {
  code: "Код индикатора",
  wording: "Описание индикатора",
  knowledges: "Код и описание знания",
  skills: "Код и описание умения",
  masterys: "Код и описание владения",
};

export function CompetencyForm({
  competencies,
  updateFields,
}: TCompetencyFormProps) {
  const handleSave = () => {
    updateFields({ competencies: competencyArray });
  };

  const [competencyArray, setCompetenceArray] = useState(competencies);
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string) => {
    setSelected(nodeIds);
  };

  // React.useEffect(() => {
  //   const selectedNodeId = selected;
  //   let selectedIndicator;
  //   let selectedKMS: string | undefined;

  //   competencyArray.forEach((competency) => {
  //     const { achievementIndicators } = competency;

  //     const indicator = achievementIndicators.find((indicator) => {
  //       if (indicator.id === selectedNodeId) {
  //         console.log(indicator.wording);
  //         setSelectedCode(indicator.wording);
  //         return true;
  //       } else if (indicator.knowledges?.id === selectedNodeId) {
  //         console.log(indicator.knowledges);
  //         setSelectedCode(indicator.knowledges?.knowledgeWording);
  //         return true;
  //       } else if (indicator.masterys?.id === selectedNodeId) {
  //         console.log(indicator.masterys?.masteryWording);
  //         setSelectedCode(indicator.masterys?.masteryWording);
  //         return true;
  //       } else if (indicator.skills?.id === selectedNodeId) {
  //         console.log(indicator.skills?.skillWording);
  //         setSelectedCode(indicator.skills?.skillWording);
  //         return true;
  //       }
  //       return false;
  //     });
  //   });

  // Find the selected competency based on selectedNodeId
  //   const selectedNode = compArray.find(
  //     (competency) => competency.id === selectedNodeId
  //   );

  //   // Check if a selected competency exists
  //   if (selectedNode) {
  //     const { name } = selectedNode;

  //     // Set the selectedCode state to the name of the selected competency
  //     setSelectedCode(name);
  //   }
  // }, [selected]);

  const initialAchievement: TAchievementIndicator = {
    id: uuidv4(),
    code: "",
    wording: "",
    knowledges: "",
    skills: "",
    masterys: "",
  };
  const initialCompetency: TCompetency = {
    id: uuidv4(),
    code: "",
    name: "",
    achievementIndicators: [initialAchievement],
  };
  const [competencyFieldValues, setCompetencyFieldValues] =
    useState<TCompetency>(initialCompetency);

  const handleCompetenceFieldChange = (name: string, value: string) => {
    setCompetencyFieldValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleAchievementFieldChange = (
    name: string,
    value: string,
    index: number
  ) => {
    setCompetencyFieldValues((prevValues) => {
      const currentIndic = prevValues.achievementIndicators[index];
      const editedIndicator = { ...currentIndic, [name]: value };
      prevValues.achievementIndicators[index] = editedIndicator;
      return {
        ...prevValues,
        achievementIndicators: [
          ...prevValues.achievementIndicators,
          // [currentIndic]:editedIndicator,
        ],
      };
    });
  };
  //Добавление индикаторов
  const addAchievementIndicator = () => {
    setCompetencyFieldValues((prevValues) => ({
      ...prevValues,
      achievementIndicators: [
        ...prevValues.achievementIndicators,
        initialAchievement,
      ],
    }));
  };
  //Удаление компетенций
  const handleDeleteCompetency = (id: string) => {
    setCompetenceArray((preValue: any) => {
      const filteredArray = preValue.filter(
        (competency: any) => competency.id !== id
      );
      return filteredArray;
    });
  };
  // Добавление новых компетенций
  const handleEditSave = (competency: TCompetency) => {
    setCompetenceArray((preValue: any) => {
      const targetIndex = preValue.findIndex(
        (el: any) => el.id === competency.id
      );
      if (targetIndex === -1) {
        preValue.push(competency);
      } else {
        preValue[targetIndex] = competency;
      }
      return preValue;
    });
    setOpen(false);
  };
  //Редактирование компетенций
  const handleCompetenceEdit = (id: string) => {
    const targetCompetency = competencyArray.find(
      (competency: any) => competency.id === id
    );
    if (targetCompetency) {
      setCompetencyFieldValues(targetCompetency);
      setOpen(true);
    }
  };

  return (
    <>
      <FormWrapper title="Компетенции">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root"]}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flex: 1, minWidth: "100%", overflowY: "auto" }}
            selected={selected}
            expanded={expanded}
            onNodeSelect={handleSelect}
            onNodeToggle={handleToggle}
          >
            {competencyArray.map((competency: any, index: number) => (
              <TreeItem
                key={index}
                nodeId={competency.id}
                label={
                  <div>
                    {competency.code}{" "}
                    <IconButton
                      size="small"
                      style={{
                        position: "relative",
                        float: "right",
                        marginRight: "20px",
                      }}
                      onClick={() => {
                        handleCompetenceEdit(competency.id);
                      }}
                    >
                      <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton
                      size="small"
                      style={{
                        position: "relative",
                        float: "right",
                        marginRight: "20px",
                      }}
                      onClick={() => {
                        handleDeleteCompetency(competency.id);
                      }}
                    >
                      <DeleteIcon fontSize="small" color="primary" />
                    </IconButton>
                  </div>
                }
              >
                {competency.achievementIndicators.map(
                  (achievement: any, index: number) => (
                    <TreeItem
                      key={achievement.id}
                      nodeId={achievement.id}
                      label={achievement.code}
                    >
                      {achievement.knowledges && (
                        <TreeItem
                          key={achievement.knowledges}
                          nodeId={achievement.knowledges}
                          label={achievement.knowledges}
                        ></TreeItem>
                      )}
                      {achievement.skills && (
                        <TreeItem
                          key={achievement.skills}
                          nodeId={achievement.skills}
                          label={achievement.skills}
                        ></TreeItem>
                      )}
                      {achievement.masterys && (
                        <TreeItem
                          key={achievement.masterys}
                          nodeId={achievement.masterys}
                          label={achievement.masterys}
                        ></TreeItem>
                      )}
                    </TreeItem>
                  )
                )}
              </TreeItem>
            ))}
          </TreeView>
          <Button
            onClick={() => {
              setCompetencyFieldValues(initialCompetency);
              setOpen(true);
            }}
          >
            Добавить новую компетенцию
          </Button>
        </Box>
      </FormWrapper>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{ minWidth: "50%" }}
      >
        <DialogTitle>Добавить новую компетенцию</DialogTitle>
        <DialogContent sx={{ minWidth: "500px" }}>
          <DialogContentText>
            <Typography className="inputTypo" variant="body2">
              Наименование компетенции
            </Typography>
            <TextField
              value={competencyFieldValues.name}
              onChange={(event) =>
                handleCompetenceFieldChange("name", event.target.value)
              }
              fullWidth
            />
            <Typography className="inputTypo" variant="body2">
              Код
            </Typography>
            <TextField
              value={competencyFieldValues.code}
              onChange={(event) =>
                handleCompetenceFieldChange("code", event.target.value)
              }
              fullWidth
            />
            <Typography className="inputTypo" variant="body2">
              Значения индикатора достижений:
            </Typography>
            {competencyFieldValues.achievementIndicators.map(
              (achievement, index) => {
                return Object.keys(achievement).map((achievementField, i) =>
                  achievementField !== "id" ? (
                    <React.Fragment key={i}>
                      <Typography className="inputTypo" variant="body2">
                        {
                          FIELD_NAMES[
                            achievementField as keyof typeof FIELD_NAMES
                          ]
                        }
                      </Typography>
                      <TextField
                        required
                        value={
                          competencyFieldValues.achievementIndicators[index][
                            achievementField as keyof TAchievementIndicator
                          ]
                        }
                        onChange={(event) =>
                          handleAchievementFieldChange(
                            achievementField,
                            event.target.value,
                            index
                          )
                        }
                        fullWidth
                      />
                    </React.Fragment>
                  ) : null
                );
              }
            )}
            <Button onClick={addAchievementIndicator}>
              Добавить индикатор
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleEditSave(competencyFieldValues);
              handleSave();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

//Update nested STATE
