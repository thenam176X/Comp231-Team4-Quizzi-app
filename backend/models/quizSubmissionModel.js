// models/submissionModel.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: String,
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    answer: mongoose.Schema.Types.Mixed,
  }],
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
