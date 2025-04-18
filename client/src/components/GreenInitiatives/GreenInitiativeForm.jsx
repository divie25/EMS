import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, MenuItem,
  Grid, Card, CardMedia
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const GreenInitiativeForm = () => {
  const [formData, setFormData] = useState({
    initiativeName: '',
    organization: '',
    type: '',
    description: '',
    impact: '',
    date: '',
    location: '',
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const types = ['Tree Planting', 'Recycling', 'Renewable Energy', 'Awareness Campaign', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    images.forEach(img => data.append('images', img));

    try {
      await axios.post('http://localhost:5000/api/green-initiatives/add', data);
      alert('Green Initiative submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to submit!');
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: 4,
        p: 4,
        borderRadius: 3,
        boxShadow: 5,
        background: '#e0f7ec',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Add Green Initiative 🌱
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Initiative Name"
              name="initiativeName"
              value={formData.initiativeName}
              onChange={handleChange}
              fullWidth required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              fullWidth required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth required
            >
              {types.map((type, idx) => (
                <MenuItem key={idx} value={type}>{type}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Impact"
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              fullWidth
              placeholder="e.g., 500 trees planted"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth required
              InputLabelProps={{ shrink: true }}
              label="Initiative Date"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              sx={{ mt: 1 }}
            >
              Upload Images
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Grid>

          {previews.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" mt={2}>Image Previews</Typography>
              <Grid container spacing={2} mt={1}>
                {previews.map((src, idx) => (
                  <Grid item xs={4} key={idx}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={src}
                        alt={`preview-${idx}`}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
              Submit Initiative
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default GreenInitiativeForm;
