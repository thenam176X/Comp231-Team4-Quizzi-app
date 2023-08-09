// // controllers/quizDataController.js
// const Question = require('../models/questionModel');

// const getAllQuestions = async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.status(200).json({ questions });
//   } catch (error) {
//     console.error('Error while fetching questions:', error);
//     res.status(500).json({ message: 'An error occurred while fetching questions' });
//   }
// };

// module.exports = {
//   getAllQuestions,
// };


// controllers/quizDataController.js
const Quiz = require('../models/questionModel');

const getQuizDataByUserType = async (req, res) => {
  try {
    const { userType } = req.params;

    // Retrieve quiz data based on user type
    const quizData = await Quiz.find({ userType });

    res.status(200).json(quizData);
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    res.status(500).json({ message: 'An error occurred while fetching quiz data' });
  }
};

module.exports = {
  getQuizDataByUserType,
};
