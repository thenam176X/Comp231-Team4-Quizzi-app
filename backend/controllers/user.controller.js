const db = require("../models");
const Quiz = db.quiz;
const User = db.user;

// Get all quiz questions
exports.getAllQuizzes = async (req, res) => {
  try {
    const userId = req.userId;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    // Get all quizzes associated with the user
    const quizzes = await Quiz.find({ user: userId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving quizzes" });
  }
};

// Add a new quiz
exports.addQuiz = async (req, res) => {
  try {
    const { quiz_title, questions } = req.body;
    const userId = req.userId;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    const newQuiz = new Quiz({
      user: userId, // Associate the quiz with the authenticated user
      quiz_title,
      questions,
    });
    await newQuiz.save();
    res.status(201).json({ message: "Quiz added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error adding the quiz" });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const { questions } = req.body;
    console.log(quizId);

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Ensure that the user owns the quiz
    if (quiz.user.toString() !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    quiz.questions = questions;
    await quiz.save();
    res.json({ message: "Quiz updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz" });
  }
};
