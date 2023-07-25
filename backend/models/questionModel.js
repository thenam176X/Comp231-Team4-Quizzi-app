// models/questionModel.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['mcq', 'fill', 'truefalse'],
  },
  text: String,
  options: {
    type: [String],
    required: function () {
      return this.type === 'mcq';
    },
  },
  answer: mongoose.Schema.Types.Mixed,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
