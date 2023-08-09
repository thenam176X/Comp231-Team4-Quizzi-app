// models/submissionModel.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    answer: mongoose.Schema.Types.Mixed,
  }],
  // Other submission fields...
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
