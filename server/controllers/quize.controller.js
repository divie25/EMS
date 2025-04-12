const Quiz = require('../models/quize.model');
const Submission = require('../models/submision.model');

// Admin: Create Quiz
exports.createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Submit Quiz (User)
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, userName, answers } = req.body;
    const quiz = await Quiz.findById(quizId);

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctAnswerIndex === answers[i]) score++;
    });

    const submission = new Submission({
      quizId,
      userName,
      answers,
      score
    });

    await submission.save();
    res.status(201).json({ score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
