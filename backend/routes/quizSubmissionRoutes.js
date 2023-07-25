// routes/quizSubmissionRoutes.js
const express = require('express');
const router = express.Router();
const quizSubmissionController = require('../controllers/quizSubmissionController');

router.post('/submitQuestionWithAnswers', quizSubmissionController.submitQuizAnswers);

module.exports = router;
