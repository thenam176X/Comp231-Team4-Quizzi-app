// routes/quizAnalyticsRoutes.js
const express = require('express');
const router = express.Router();
const quizAnalyticsController = require('../controllers/quizAnalyticsController');

router.get('/quiz-analytics', quizAnalyticsController.getQuizAnalytics);

module.exports = router;
