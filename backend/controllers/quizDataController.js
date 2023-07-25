// controllers/quizDataController.js
const Question = require('../models/questionModel');

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ questions });
  } catch (error) {
    console.error('Error while fetching questions:', error);
    res.status(500).json({ message: 'An error occurred while fetching questions' });
  }
};

module.exports = {
  getAllQuestions,
};
