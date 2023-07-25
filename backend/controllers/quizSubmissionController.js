// controllers/submissionController.js
const Submission = require('../models/quizSubmissionModel');

const submitQuizAnswers = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    // Create a new submission instance
    const submission = new Submission({
      userId,
      answers,
    });

    // Save the submission to the database
    await submission.save();

    res.status(200).json({ message: 'Quiz submission saved successfully' });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: 'An error occurred while submitting the quiz' });
  }
};

module.exports = {
    submitQuizAnswers,
};
