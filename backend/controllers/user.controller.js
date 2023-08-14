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
    const { quizId, userId } = req.body;

    const quiz = await Quiz.findOne({ _id: quizId, user: userId });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
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
function calculateQuizScore(userAnswers) {
  let correctCount = 0;
  userAnswers.map((question) => {
    if (question.userAnswer.toLowerCase() ===
        question.correctAnswer.toLowerCase()) {
      correctCount++;
    }
  });

  return correctCount;
}
exports.submitQuiz = async (req, res) => {
  try {
    const {
      userId,
      quizId,
      userAnswers,
    } = req.body;

    const quiz = await Quiz.findOne({ _id: quizId, user: userId });

    if (!quiz) {
      return res
        .status(404)
        .json({ error: "Quiz not found or not associated with the user." });
    }
    const quizScore = calculateQuizScore(userAnswers);
    quiz.score = quizScore;
    quiz.userAnswers = userAnswers;

    const savedQuiz = await quiz.save();

    res.status(200).json({
      quiz: {
        ...savedQuiz._doc,
        score: quizScore,
        userAnswers: userAnswers.map(answer => ({
          ...answer,
          timeLimit: answer.timeLimit,
          quizTitle: answer.quizTitle,
        })),
      },
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the quiz." });
  }
};
