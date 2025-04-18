import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";

const AdminInitiativePage = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchInitiatives = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/green-initiatives/all");
      setInitiatives(res.data);
    } catch (error) {
      console.error("Error fetching initiatives", error);
    }
  };

  useEffect(() => {
    fetchInitiatives();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/green-initiatives/${id}`);
      fetchInitiatives();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEditOpen = (initiative) => {
    setEditData(initiative);
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/green-initiatives/${editData._id}`, editData);
      fetchInitiatives();
      handleEditClose();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
    width: "90%",
    maxWidth: 600,
    outline: "none",
  };

  return (
    <>
      <Typography variant="h5" align="center" sx={{ my: 3 }}>
        🌟 Admin Initiative Table 🌟
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: "95%", mx: "auto" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Org</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initiatives.map((initiative) => (
              <TableRow key={initiative._id}>
                <TableCell>
                  <img
                    src={`http://localhost:5000/${initiative.images[0].replace(/\\/g, "/")}`}
                    alt="img"
                    style={{ height: 60, width: 80, borderRadius: 8 }}
                  />
                </TableCell>
                <TableCell>{initiative.initiativeName}</TableCell>
                <TableCell>{initiative.type}</TableCell>
                <TableCell>{initiative.organization}</TableCell>
                <TableCell>{initiative.location}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditOpen(initiative)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(initiative._id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleEditClose}>
        <Box
          component={motion.div}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          sx={modalStyle}
        >
          <Typography variant="h6" mb={2}>Edit Initiative</Typography>
          {editData && (
            <>
              <TextField
                fullWidth
                label="Initiative Name"
                value={editData.initiativeName}
                onChange={(e) =>
                  setEditData({ ...editData, initiativeName: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Type"
                value={editData.type}
                onChange={(e) =>
                  setEditData({ ...editData, type: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Organization"
                value={editData.organization}
                onChange={(e) =>
                  setEditData({ ...editData, organization: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Location"
                value={editData.location}
                onChange={(e) =>
                  setEditData({ ...editData, location: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <Button variant="contained" onClick={handleUpdate} fullWidth>
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AdminInitiativePage;
