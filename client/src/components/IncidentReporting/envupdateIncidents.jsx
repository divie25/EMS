import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../config/config";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import SearchIcon from "@mui/icons-material/Search";

const EnvUpdateIncident = () => {
  const [incidents, setIncidents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const user =JSON.parse( localStorage.getItem("user"))

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get(url + "/api/incidents");
        setIncidents(response.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);

  // Filter incidents based on search query
  const filteredIncidents = incidents.filter((incident) =>
    incident.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open dialog to update status
  const handleOpenDialog = (incident) => {
    setSelectedIncident(incident);
    setNewStatus(incident.status);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedIncident(null);
  };

  // Handle status update
  const handleUpdateStatus = async () => {
    if (!selectedIncident) return;

    try {
        console.log("clicked",newStatus);
        
      const response = await axios.put(url + `/api/incidents/${selectedIncident._id}`, {
        status: newStatus,role:user.role
      });

      console.log(response);
      

      if (response.status === 200) {
        setIncidents((prev) =>
          prev.map((incident) =>
            incident._id === selectedIncident._id ? { ...incident, status: newStatus } : incident
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 3,
        maxWidth: "900px",
        margin: "auto",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Reported Incidents
      </Typography>

      {/* Search Field */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search incidents..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {filteredIncidents.length > 0 ? (
          filteredIncidents.map((incident) => (
            <Grid item xs={12} sm={6} md={4} key={incident._id}>
              <Card
                sx={{
                  padding: 2,
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  "&:hover": {
                    transform: "scale(1.03)",
                    transition: "0.3s ease-in-out",
                  },
                }}
              >
                <CardContent>
                  {/* Incident Title with Avatar Icon */}
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Avatar>
                        <PublicIcon />
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {incident.title}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {incident.description}
                  </Typography>

                  {/* Status Chip */}
                  <Chip
                    label={incident.status}
                    sx={{
                      marginTop: 1,
                      backgroundColor:
                        incident.status === "Resolved"
                          ? "#4caf50"
                          : incident.status === "In Progress"
                          ? "#ff9800"
                          : incident.status === "Closed"
                          ? "#2c3e50"
                          : "#e74c3c",
                      color: "#fff",
                    }}
                  />

                  {/* Location Link */}
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LocationOnIcon />}
                    href={`https://www.google.com/maps?q=${incident.location}`}
                    target="_blank"
                    sx={{ marginTop: 2, textTransform: "none" }}
                  >
                    View Location
                  </Button>

                  {/* Update Status Button */}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenDialog(incident)}
                    sx={{ marginTop: 2, textTransform: "none", marginLeft: 1 }}
                  >
                    Update Status
                  </Button>

                  {/* Display Uploaded Image (if available) */}
                  {incident.image && (
                    <img
                      src={`http://localhost:5000/${incident.image}`}
                      alt="Incident"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginTop: "15px",
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ width: "100%", marginTop: 3 }}
          >
            No incidents found.
          </Typography>
        )}
      </Grid>

      {/* Status Update Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Incident Status</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <MenuItem value="Reported">Reported</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateStatus} color="secondary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default EnvUpdateIncident;
