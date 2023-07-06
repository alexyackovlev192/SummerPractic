import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

import "./upload-page.css";
import { handleUploadButtonClick } from "./upload.js";


const UploadPage: React.FC = () => {
  const [directionName, setDirectionName] = useState("");
  const [profilName, setProfilName] = useState("");
  const [Year, setYear] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsText(selectedFile, 'windows-1251');
      reader.onload = function() {

        const text = reader.result as string;
        var startIndexDir = text.indexOf('Название');
        //console.log(startIndexDir);
        startIndexDir += 9;
        var endIndexDir = text.indexOf('"', startIndexDir+1);
        //console.log(endIndexDir);
        const nameDir = text.substring(startIndexDir+1, endIndexDir);
        setDirectionName(nameDir);
        console.log(nameDir);
        var startIndexProf = text.indexOf('Название',endIndexDir);
        //console.log(startIndexProf);
        startIndexProf += 9;
        var endIndexProf = text.indexOf('"', startIndexProf+1);
        //console.log(endIndexProf);
        const nameProf = text.substring(startIndexProf+1, endIndexProf);
        setProfilName(nameProf);
        console.log(nameProf);
        var startIndexYear = text.indexOf('ГодНачалаПодготовки',endIndexProf);
        //console.log(startIndexYear);
        startIndexYear += 20;
        var endIndexYear = text.indexOf('"', startIndexYear+1);
        const year = text.substring(startIndexYear+1, endIndexYear);
        setYear(year);
        console.log(year);
      };
    }
  };
  return (
    <div className="upload-page">
      <div className="padClass">
        <Typography className="planText" variant="h5">
          Загрузка учебного плана
        </Typography>
        <div className="Vis">
          <Typography variant="body1" style={{fontWeight: "bold", paddingBottom: "10px" }}>Название направления: {directionName}</Typography>
          <Typography variant="body1" style={{fontWeight: "bold", paddingBottom: "10px" }}>Название профиля: {profilName}</Typography>
          <Typography variant="body1" style={{fontWeight: "bold", paddingBottom: "10px" }}>Год начала подготовки: {Year}</Typography>
        </div>
        <form className="formcentr">
          <Input type="file" onChange={handleFileChange} id="file-to-upload" />
          <Button onClick={handleUploadButtonClick} variant="contained">
            Upload
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;