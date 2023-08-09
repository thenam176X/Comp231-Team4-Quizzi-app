// routes/quizHistoryRoutes.js
const express = require('express');
const router = express.Router();
const quizHistoryController = require('../controllers/quizHistoryController');
const authMiddleware = require('../middleware/authJwt');

router.get('/quiz-history', authMiddleware.verifyToken, quizHistoryController.getQuizHistory);

module.exports = router;
