const mongoose = require("mongoose");

const Quiz = mongoose.model(
  "Quiz",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz_title: String,
    questions: [
      {
        question_type: String,
        question: String,
        answer: String,
      },
    ],
  })
);
module.exports = Quiz;
