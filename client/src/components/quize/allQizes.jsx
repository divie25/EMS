import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, TextField, Select, MenuItem, Button
} from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function AllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [search, setSearch] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const navigate=useNavigate()



  useEffect(() => {
    axios.get('http://localhost:5000/api/quizzes').then(res => {
      setQuizzes(res.data);
      setFilteredQuizzes(res.data);
    });
  }, []);

  useEffect(() => {
    let result = quizzes;
    if (search) {
      result = result.filter(q => q.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (filterTopic) {
      result = result.filter(q => q.topic === filterTopic);
    }
    setFilteredQuizzes(result);
  }, [search, filterTopic, quizzes]);

  const exportPDF = () => {
    const doc = new jsPDF();
    filteredQuizzes.forEach((quiz, index) => {
      doc.setFontSize(14);
      doc.setTextColor('#0d47a1');
      doc.text(`Quiz Title: ${quiz.title}`, 10, 20 + index * 50);
      doc.setTextColor('#000');
      doc.text(`Topic: ${quiz.topic}`, 10, 30 + index * 50);
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.rect(8, 12 + index * 50, 190, 40); // box-style
    });
    doc.save('quizzes.pdf');
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredQuizzes.map(q => ({
      Title: q.title,
      Topic: q.topic,
      Questions: q.questions.length
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Quizzes');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'quizzes.xlsx');
  };

  const uniqueTopics = [...new Set(quizzes.map(q => q.topic))];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>All Quizzes</Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search by title"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Select
          value={filterTopic}
          onChange={e => setFilterTopic(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">All Topics</MenuItem>
          {uniqueTopics.map((topic, idx) => (
            <MenuItem key={idx} value={topic}>{topic}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="success" onClick={exportPDF}>Export PDF</Button>
        <Button variant="contained" color="info" onClick={exportExcel}>Export Excel</Button>
      </Box>

      <Grid container spacing={3}>
        {filteredQuizzes.map((quiz, index) => (
            <>
            {/* <Link to={"/takequiz/"+quiz._id} > */}

          <Grid item xs={12} sm={6} md={4} key={quiz._id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: 5 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">{quiz.title}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">{quiz.topic}</Typography>
                  <Typography variant="body2" mt={1}>
                    {quiz.questions.length} Questions
                  </Typography>
                   <Button onClick={()=>navigate(`/takequiz/${quiz._id}`)}>Attend the Quizes</Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
            {/* </Link> */}
            </>
        ))}
      </Grid>
    </Box>
  );
}
