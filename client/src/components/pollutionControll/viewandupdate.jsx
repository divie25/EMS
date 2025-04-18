import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  FormControl,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import SimplePDFViewer from "./documentviewer";

const PollutionComplianceTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [docDialog, setDocDialog] = useState({ open: false, docs: [], index: 0 });

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/pollution-controlle/all");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`http://localhost:5000/api/pollution-controlle/update/${id}`, {
      complianceStatus: newStatus,
    });
    fetchData();
  };

  const filteredData = data.filter((item) => {
    return (
      item.entityName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? item.complianceStatus === statusFilter : true)
    );
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compliance");
    XLSX.writeFile(workbook, "PollutionCompliance.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Pollution Compliance Report", 20, 20);

    let y = 30;
    filteredData.forEach((item, index) => {
      doc.text(`\n${index + 1}. ${item.entityName} | ${item.industryType} | ${item.complianceStatus}`, 20, y);
      y += 10;
    });
    doc.save("PollutionCompliance.pdf");
  };

  const handleDocClick = (docs) => {
    setDocDialog({ open: true, docs, index: 0 });
  };

  const nextDoc = () => {
    setDocDialog((prev) => ({ ...prev, index: (prev.index + 1) % prev.docs.length }));
  };

  const prevDoc = () => {
    setDocDialog((prev) => ({ ...prev, index: (prev.index - 1 + prev.docs.length) % prev.docs.length }));
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Card sx={{ maxWidth: 1200, mx: "auto", p: 3, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Pollution Compliance Dashboard
          </Typography>

          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Search by Entity Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Compliant">Compliant</MenuItem>
                  <MenuItem value="Non-compliant">Non-compliant</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3} display="flex" gap={1}>
              <Button variant="contained" color="success" onClick={exportToExcel}>
                Export Excel
              </Button>
              <Button variant="contained" color="secondary" onClick={exportToPDF}>
                Export PDF
              </Button>
            </Grid>
          </Grid>

          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Entity</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Inspection</TableCell>
                <TableCell>Next Inspection</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Documents</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={item._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.entityName}</TableCell>
                  <TableCell>{item.industryType}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <Select
                      value={item.complianceStatus}
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                    >
                      <MenuItem value="Compliant">Compliant</MenuItem>
                      <MenuItem value="Non-compliant">Non-compliant</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{item.lastInspectionDate?.slice(0, 10)}</TableCell>
                  <TableCell>{item.nextInspectionDate?.slice(0, 10)}</TableCell>
                  <TableCell>{item.notes}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        item.documents.forEach(doc => {
                          const url = `http://localhost:5000/${doc}`.replace(/\\/g, "/");
                          window.open(url, '_blank');
                        });
                      }}
                    >
                      View Documents
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={docDialog.open} onClose={() => setDocDialog({ ...docDialog, open: false })} maxWidth="md">
        <DialogTitle>
          Document Viewer
          <IconButton onClick={prevDoc}>
            <ArrowBackIos />
          </IconButton>
          <IconButton onClick={nextDoc}>
            <ArrowForwardIos />
          </IconButton>
        </DialogTitle>
        {
          console.log(`http://localhost:5000/${docDialog.docs[docDialog.index]}`.replace(/\\/g, "/"))

        }
        <DialogContent>

          <SimplePDFViewer fileUrl={`http://localhost:5000/${docDialog.docs[docDialog.index]}`.replace(/\\/g, "/")} />



        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PollutionComplianceTable;
