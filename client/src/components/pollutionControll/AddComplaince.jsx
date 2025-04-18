import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Card,
  CardContent,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";

const complianceOptions = ["Compliant", "Non-compliant"];

const PollutionComplianceForm = () => {
  const [formData, setFormData] = useState({
    entityName: "",
    industryType: "",
    location: "",
    complianceStatus: "Non-compliant",
    lastInspectionDate: "",
    nextInspectionDate: "",
    notes: "",
  });
  const [documents, setDocuments] = useState([]);
  const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setDocuments(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      fd.append(key, val);
    });
    documents.forEach((doc) => fd.append("documents", doc));

    try {
      await axios.post("http://localhost:5000/api/pollution-controlle/add", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnack({ open: true, msg: "Record added successfully!", type: "success" });
      setFormData({
        entityName: "",
        industryType: "",
        location: "",
        complianceStatus: "Non-compliant",
        lastInspectionDate: "",
        nextInspectionDate: "",
        notes: "",
      });
      setDocuments([]);
    } catch (error) {
      setSnack({ open: true, msg: "Error adding record!", type: "error" });
      console.error(error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card
        sx={{
          maxWidth: 800,
          mx: "auto",
          mt: 5,
          boxShadow: 6,
          borderRadius: "20px",
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom textAlign="center">
            Pollution Compliance Form
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="entityName"
                  label="Entity Name"
                  value={formData.entityName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="industryType"
                  label="Industry Type"
                  value={formData.industryType}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="location"
                  label="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  name="complianceStatus"
                  label="Compliance Status"
                  value={formData.complianceStatus}
                  onChange={handleChange}
                >
                  {complianceOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="lastInspectionDate"
                  label="Last Inspection Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.lastInspectionDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="nextInspectionDate"
                  label="Next Inspection Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.nextInspectionDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="notes"
                  label="Notes"
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Documents (PDF/JPG/PNG)
                  <input
                    type="file"
                    hidden
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                  />
                </Button>
                <Typography variant="body2" mt={1}>
                  {documents.length > 0 && `${documents.length} file(s) selected`}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={2}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit Record
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.type} variant="filled">
          {snack.msg}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default PollutionComplianceForm;
