import React, { useState, useEffect } from "react";
import { Typography, TextField, Box, Button } from "@mui/material";
import { FormWrapper } from "./FormWrapper";
import Alert from "@mui/material/Alert";

type TDiscContent = {
  id: number;
  discSection: string;
  lectureHours?: string;
  semHours?: string;
  labHours?: string;
  contactHours?: string;
  selfHours?: string;
};

type TDiscContentData = {
  discSections: TDiscContent[];
};

type TDiscContentFormProps = TDiscContentData & {
  hours: string;
  updateFields: (fields: Partial<TDiscContentData>) => void;
};

export function DiscContentForm({
  hours,
  discSections,
  updateFields,
}: TDiscContentFormProps) {
  useEffect(() => {
    setDiscContentArray(discSections);
  }, [discSections]);

  let idNum = 1;
  const discNum = () => {
    return idNum++;
  };

  const addDiscSection = () => {
    const newDiscSection: TDiscContent = {
      id: Date.now(),
      discSection: "",
      lectureHours: "",
      semHours: "",
      labHours: "",
      contactHours: "",
      selfHours: "",
    };
    setDiscContentArray([...discContentArray, newDiscSection]);
    setButtonChecker(true);
  };
  const [buttonChecker, setButtonChecker] = useState(false);

  const [discContentArray, setDiscContentArray] =
    useState<TDiscContent[]>(discSections);

  const [fieldValues, setFieldValues] = useState<
    Record<number, Partial<TDiscContent>>
  >({});

  const handleDiscSectionChange =
    (id: number, field: keyof TDiscContent) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setFieldValues((prevValues) => ({
        ...prevValues,
        [id]: {
          ...prevValues[id],
          [field]: newValue,
        },
      }));
    };

  useEffect(() => {
    const updatedArray = discContentArray.map((discSection) => {
      const fieldValuesForSection = fieldValues[discSection.id] || {};
      return {
        ...discSection,
        ...fieldValuesForSection,
      };
    });
    updateFields({ discSections: updatedArray }); // Update the parent component's state
  }, [fieldValues]);

  const countTotalHours = () => {
    let totalHours = 0;
    discContentArray.forEach((discSection) => {
      const fieldValuesForSection = fieldValues[discSection.id] || {};
      const {
        lectureHours = "",
        semHours = "",
        labHours = "",
        contactHours = "",
        selfHours = "",
      } = fieldValuesForSection;
      totalHours +=
        Number(lectureHours) +
        Number(semHours) +
        Number(labHours) +
        Number(contactHours) +
        Number(selfHours);
    });
    return totalHours;
  };

  const totalHours = countTotalHours();
  console.log(totalHours);
  console.log(hours);

  return (
    <div style={{ width: "95%" }}>
      <FormWrapper title="Разделы дисциплины">
        <Box display="flex" flexDirection="column" alignItems="center">
          {buttonChecker && parseInt(hours) != totalHours && (
            <Alert severity="warning">Колличество часов не сходится</Alert>
          )}
          <Button onClick={addDiscSection}>Добавить раздел</Button>
          {discContentArray.map((discSection) => (
            <div key={discSection.id}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div style={{ width: "100%" }}>
                  <Typography variant="body2" className="inputTypo">
                    Раздел {discNum()}
                  </Typography>
                  <TextField
                    id={`discSection-${discSection.id}`}
                    value={
                      fieldValues[discSection.id]?.discSection ||
                      discSection.discSection
                    }
                    onChange={handleDiscSectionChange(
                      discSection.id,
                      "discSection"
                    )}
                    multiline
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ width: "20%" }}>
                  <Typography variant="body2" className="inputTypo">
                    Часов на лекции:
                  </Typography>
                  <TextField
                    id={`lectureHours-${discSection.id}`}
                    value={
                      fieldValues[discSection.id]?.lectureHours ||
                      discSection.lectureHours
                    }
                    onChange={handleDiscSectionChange(
                      discSection.id,
                      "lectureHours"
                    )}
                    style={{ width: "20%" }}
                  />
                </div>
                <div style={{ width: "20%" }}>
                  <Typography variant="body2" className="inputTypo">
                    Часов на семинары:
                  </Typography>
                  <TextField
                    id={`semHours-${discSection.id}`}
                    value={
                      fieldValues[discSection.id]?.semHours ||
                      discSection.semHours
                    }
                    onChange={handleDiscSectionChange(
                      discSection.id,
                      "semHours"
                    )}
                    style={{ width: "20%" }}
                  />
                </div>
                <div style={{ width: "20%" }}>
                  <Typography variant="body2" className="inputTypo">
                    Часов на лабораторные работы:
                  </Typography>
                  <TextField
                    id={`labHours-${discSection.id}`}
                    value={
                      fieldValues[discSection.id]?.labHours ||
                      discSection.labHours
                    }
                    onChange={handleDiscSectionChange(
                      discSection.id,
                      "labHours"
                    )}
                    style={{ width: "20%" }}
                  />
                </div>
                <div style={{ width: "20%" }}>
                  <Typography variant="body2" className="inputTypo">
                    Часов на КРП:
                  </Typography>
                  <TextField
                    id={`contactHours-${discSection.id}`}
                    value={
                      fieldValues[discSection.id]?.contactHours ||
                      discSection.contactHours
                    }
                    onChange={handleDiscSectionChange(
                      discSection.id,
                      "contactHours"
                    )}
                    style={{ width: "20%" }}
                  />
                </div>
                <div style={{ width: "20%" }}>
                  <Typography variant="body2" className="inputTypo">
                    Часов на самостоятельную:
                  </Typography>
                  <TextField
                    id={`selfHours-${discSection.id}`}
                    value={
                      fieldValues[discSection.id]?.selfHours ||
                      discSection.selfHours
                    }
                    onChange={handleDiscSectionChange(
                      discSection.id,
                      "selfHours"
                    )}
                    style={{ width: "20%" }}
                  />
                </div>
              </div>
            </div>
          ))}
          <Typography sx={{ paddingTop: "16px" }} variant="body2">
            Общее колличество введенных часов: {totalHours}
          </Typography>
        </Box>
      </FormWrapper>
    </div>
  );
}
