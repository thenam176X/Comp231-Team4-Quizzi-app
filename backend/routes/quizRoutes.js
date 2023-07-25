// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/questions', quizController.createQuestion);

module.exports = router;
