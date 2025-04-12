const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quize.controller');

router.post('/quizzes', quizController.createQuiz);       // Admin creates quiz
router.get('/quizzes', quizController.getAllQuizzes);     // Get all quizzes
router.get('/quizzes/:id', quizController.getQuizById);   // Get quiz by ID
router.post('/submit', quizController.submitQuiz);        // User submits quiz

module.exports = router;
