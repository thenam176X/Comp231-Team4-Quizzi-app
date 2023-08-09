// routes/answerRoutes.js
const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.post('/save-answers', answerController.saveUserAnswers);

module.exports = router;
