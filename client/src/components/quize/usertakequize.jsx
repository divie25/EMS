import React, { useEffect, useState } from 'react';
import {
  Typography, Button, RadioGroup, Radio, FormControlLabel,
  Box, TextField, Modal, Backdrop, Fade, Paper
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';

export default function TakeQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(null);
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quizzes/${id}`).then(res => {
      setQuiz(res.data);
      setAnswers(Array(res.data.questions.length).fill(null));
    });
  }, [id]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(quiz.title, 10, 15);
    let y = 25;
    quiz.questions.forEach((q, idx) => {
      let startY = y;
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.setFillColor(240, 240, 240);
      let boxHeight = 10 + q.options.length * 7;
      doc.rect(10, y, 190, boxHeight, 'FD');
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`${idx + 1}. ${q.questionText}`, 12, y + 7);
      let options = ["(a)", "(b)", "(c)", "(d)"];
      q.options.forEach((opt, i) => {
        doc.text(`${options[i]} => ${opt}`, 15, y + 14 + i * 7);
      });
      y += boxHeight + 5;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save('quiz_questions_boxed.pdf');
  };

  const exportToExcel = () => {
    const data = quiz.questions.map((q, idx) => {
      const questionObj = {
        'Question No': idx + 1,
        'Question': q.questionText,
      };
      q.options.forEach((opt, i) => {
        questionObj[`Option ${i + 1}`] = opt;
      });
      return questionObj;
    });
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Quiz Questions');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, 'quiz_questions.xlsx');
  };

  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5000/api/submit', {
      quizId: id,
      userName,
      answers,
    });
    setScore(res.data.score);
    setOpen(true);
    setIsSubmitted(true);
  };

  const handleClose = () => setOpen(false);

  if (!quiz) return <Typography>Loading...</Typography>;

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ minHeight: '100vh', bgcolor: '#f0f4f8' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {quiz.title}
        </Typography>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TextField
          label="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ maxWidth: 500, mb: 3 }}
        />
      </motion.div>

      <Box display="flex" gap={2} mb={3}>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button variant="outlined" color="secondary" onClick={exportToPDF}>
            Export to PDF
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button variant="outlined" color="success" onClick={exportToExcel}>
            Export to Excel
          </Button>
        </motion.div>
      </Box>

      {quiz?.questions?.map((q, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          style={{ width: '100%', maxWidth: 700 }}
        >
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {idx + 1}. {q.questionText}
            </Typography>
            <RadioGroup
              value={answers[idx]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[idx] = Number(e.target.value);
                setAnswers(newAnswers);
              }}
            >
              {q.options.map((opt, optIdx) => {
                const isSelected = answers[idx] === optIdx;
                const bgColor =
                  isSubmitted && isSelected
                    ? optIdx === 0
                      ? '#f8d7da'
                      : '#d4edda'
                    : 'transparent';

                return (
                  <Box
                    key={optIdx}
                    sx={{
                      bgcolor: bgColor,
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      my: 0.5,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <FormControlLabel
                      value={optIdx}
                      control={<Radio />}
                      label={opt}
                    />
                  </Box>
                );
              })}
            </RadioGroup>
          </Paper>
        </motion.div>
      ))}

      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          size="large"
          sx={{ mt: 2 }}
        >
          Submit Quiz
        </Button>
      </motion.div>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: 'background.paper',
              border: `2px solid ${score === quiz.questions.length ? "#1976d2" : "red"}`,
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Quiz Completed!
            </Typography>
            <Typography variant="h6">
              You scored {score}/{quiz.questions.length}
            </Typography>
            <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
