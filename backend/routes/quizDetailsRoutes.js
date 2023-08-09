// routes/quizDetailsRoutes.js
const express = require('express');
const router = express.Router();
const quizDetailsController = require('../controllers/quizDetailsController');

router.get('/quiz-details', quizDetailsController.getQuizDetails);

module.exports = router;
