import React, { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { Box, Button, LinearProgress, Typography } from "@mui/material";

const FileUpload: React.FC<{ onUploadSuccess: () => void }> = ({ onUploadSuccess }) => {
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event: AxiosProgressEvent) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          }
        },
      });
      setMessage("Upload successful!");
      onUploadSuccess();
    } catch {
      setMessage("Upload failed. Please try again.");
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Button variant="contained" component="label">
        Upload CSV
        <input type="file" hidden accept=".csv" onChange={handleFileChange} />
      </Button>
      {progress > 0 && <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />}
      <Typography variant="body2" sx={{ mt: 1 }}>{message}</Typography>
    </Box>
  );
};

export default FileUpload;
