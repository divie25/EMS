// AdminAddQuiz.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

export default function AdminAddQuiz() {
  const [quiz, setQuiz] = useState({ title: '', topic: '', questions: [] });
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const addQuestion = () => {
    const newQuestion = { questionText, options, correctAnswerIndex };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
    setQuestionText('');
    setOptions(['', '', '', '']);
  };

  const saveQuiz = async () => {
    await axios.post('http://localhost:5000/api/quizzes', quiz);
    alert("Quiz Created");
    setQuiz({ title: '', topic: '', questions: [] });
  };

  return (
    <Box p={2}>
      <Typography variant="h4">Create New Quiz</Typography>
      <TextField label="Title" fullWidth margin="normal" value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
      <TextField label="Topic" fullWidth margin="normal" value={quiz.topic} onChange={(e) => setQuiz({ ...quiz, topic: e.target.value })} />

      <Box mt={2}>
        <Typography variant="h6">Add Question</Typography>
        <TextField label="Question" fullWidth value={questionText} onChange={(e) => setQuestionText(e.target.value)} margin="normal" />
        {options.map((opt, idx) => (
          <TextField
            key={idx}
            label={`Option ${idx + 1}`}
            fullWidth
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[idx] = e.target.value;
              setOptions(newOptions);
            }}
            margin="dense"
          />
        ))}
        <TextField label="Correct Answer Index" type="number" value={correctAnswerIndex} onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))} margin="normal" />
        <Button onClick={addQuestion} variant="contained">Add Question</Button>
      </Box>

      <Button onClick={saveQuiz} variant="contained" color="success" sx={{ mt: 2 }}>Save Quiz</Button>
    </Box>
  );
}
