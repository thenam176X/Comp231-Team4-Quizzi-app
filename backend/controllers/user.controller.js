const db = require("../models");
const Quiz = db.quiz;
const User = db.user;

// Get all quiz questions
exports.getAllQuizzes = async (req, res) => {
  try {
    const { userId } = req.body;

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
    const { user, title, questions } = req.body;

    const newQuiz = new Quiz({
      user,
      title,
      questions,
    });

    const savedQuiz = await newQuiz.save();

    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the quiz." });
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

exports.getQuizById = async (req, res) => {
  try {
    const quizId = req.params.id; // Get the quizId from the URL parameter

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Ensure that the user owns the quiz
    if (quiz.user.toString() !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving quiz" });
  }
};

exports.getLatestQuiz = async (req, res) => {
  try {
    const latestQuiz = await Quiz.findOne({ user: req.body.userId })
      .sort({ _id: -1 })
      .limit(1);
    if (!latestQuiz) {
      return res.status(404).json({ message: "No quizzes found" });
    }

    res.json(latestQuiz);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the latest quiz" });
  }
};
