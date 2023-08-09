// controllers/quizHistoryController.js
const Submission = require('../models/quizSubmissionModel');

exports.getQuizHistory = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you set the user ID in the request during authentication

    // Fetch quiz history submissions for the current user
    const quizHistory = await Submission.find({ userId });

    res.status(200).json({ quizHistory });
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    res.status(500).json({ message: 'An error occurred while fetching quiz history' });
  }
};
