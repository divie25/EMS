const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswerIndex: Number
});

const quizSchema = new mongoose.Schema({
  title: String,
  topic: String,
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
