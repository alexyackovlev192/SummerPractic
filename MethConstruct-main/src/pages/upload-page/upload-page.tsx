import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

import "./upload-page.css";
import { handleUploadButtonClick } from "./upload.js";
const UploadPage: React.FC = () => {
  return (
    <div className="upload-page">
      <div className="padClass">
        <Typography className="planText" variant="h5">
          Загрузка учебного плана
        </Typography>
        <form className="formcentr">
          <Input type="file" id="file-to-upload" />
          <Button onClick={handleUploadButtonClick} variant="contained">
            Upload
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;