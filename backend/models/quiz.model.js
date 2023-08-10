const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answers: {
    type: [String],
  },
  correctAnswerIndex: {
    type: Number,
  },
  quizType: {
    type: String,
  },
  timeLimit: {
    type: Number,
  },
});

const quizSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
  submittedAnswers: {
    type: [Number], // Array of user's answers
  },
  score: {
    type: Number, // Quiz score
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
