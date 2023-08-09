// controllers/answerController.js
const Submission = require('../models/quizSubmissionModel');

exports.saveUserAnswers = async (req, res) => {
  try {
    const { userId, userType, answers } = req.body;

    // Create a new submission instance
    const submission = new Submission({
      userId,
      userType,
      answers,
    });

    // Save the submission to the database
    await submission.save();

    res.status(201).json({ message: 'User answers saved successfully' });
  } catch (error) {
    console.error('Error saving user answers:', error);
    res.status(500).json({ message: 'An error occurred while saving user answers' });
  }
};
