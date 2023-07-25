// controllers/quizController.js
const Question = require('../models/questionModel');

const createQuestion = async (req, res) => {
  try {
    const { type, text, options, answer } = req.body;

    const question = new Question({
      type,
      text,
      options,
      answer,
    });

    await question.save();

    res.status(200).json({ message: 'Question created successfully', question });
  } catch (error) {
    console.error('Question creation error:', error);
    res.status(500).json({ message: 'An error occurred while creating the question' });
  }
};

module.exports = {
  createQuestion,
};
