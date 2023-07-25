// routes/quizDataRoutes.js
const express = require('express');
const router = express.Router();
const quizDataController = require('../controllers/quizDataController');

router.get('/questions', quizDataController.getAllQuestions);

module.exports = router;
