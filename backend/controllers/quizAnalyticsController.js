// controllers/quizAnalyticsController.js
const Submission = require('../models/quizSubmissionModel');

exports.getQuizAnalytics = async (req, res) => {
  try {
    // Fetch quiz takers' performance analytics data
    const analyticsData = await Submission.aggregate([
      {
        $group: {
          _id: '$userId',
          totalCorrect: { $sum: { $cond: [{ $eq: ['$answers.answer', '$answers.questionId'] }, 1, 0] } },
          totalQuestions: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users', // Assuming your user collection name is 'users'
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          _id: 1,
          totalCorrect: 1,
          totalQuestions: 1,
          user: { $arrayElemAt: ['$user', 0] },
        },
      },
    ]);

    res.status(200).json({ analyticsData });
  } catch (error) {
    console.error('Error fetching quiz analytics data:', error);
    res.status(500).json({ message: 'An error occurred while fetching quiz analytics data' });
  }
};
