// controllers/quizDetailsController.js
const Question = require('../models/questionModel');

exports.getQuizDetails = async (req, res) => {
  try {
    // Fetch all quiz questions
    const quizQuestions = await Question.find();

    res.status(200).json({ quizQuestions });
  } catch (error) {
    console.error('Error fetching quiz details:', error);
    res.status(500).json({ message: 'An error occurred while fetching quiz details' });
  }
};
