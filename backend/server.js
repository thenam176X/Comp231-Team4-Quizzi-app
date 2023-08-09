const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./models");
const DBUri = require("./config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "quizzi-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);


// -------------------------------------I ADD THIS CODE--------------------
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [{
    question: String,
    answers: [String],
    correctAnswerIndex: Number,
    quizType: String,
    timeLimit: Number, // Add this line
  }]
});

const Quiz = mongoose.model('Quiz', quizSchema);

app.post('/api/user/quiz', (req, res) => {
  const newQuiz = new Quiz({
    title: req.body.title,
    quizType: req.body.quizType,
    questions: req.body.questions.map(question => ({
      ...question,
      timeLimit: question.timeLimit, // Add this line
    })),
  });

  newQuiz.save((err, savedQuiz) => {
    if (err) {
      res.status(500).send('Error creating quiz.');
    } else {
      res.status(200).json({ message: 'Quiz Created!', quizId: savedQuiz._id });
    }
  });
});
// Add this endpoint to get the quiz from databse to quiz preview page
app.get('/api/user/quiz', (req, res) => {
  Quiz.find({}, (err, quizzes) => {
    if (err) {
      res.status(500).send('Error fetching quizzes.');
    } else {
      res.status(200).json(quizzes);
    }
  });
});

// Add this endpoint to get the latest quiz
app.get('/api/user/quiz/latest', (req, res) => {
  Quiz.findOne().sort({ '_id': -1 }).exec((err, quiz) => {
    if (err) {
      res.status(500).send('Error fetching latest quiz.');
    } else {
      res.status(200).json(quiz);
    }
  });
});

// handle send answer from taking quiz page to backend
const quizResultSchema = new mongoose.Schema({
  completedQuestions: [Number],
  incompleteQuestions: Number,
  userAnswers: [{
    question: String,
    trueAnswer: String,
    userAnswer: String,
    correctAnswerIndex: String,
  }],
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

app.post('/api/user/quiz/submit', (req, res) => {
  const newQuizResult = new QuizResult(req.body);

  newQuizResult.save((err, savedQuizResult) => {
    if (err) {
      res.status(500).send('Error submitting quiz.');
    } else {
      res.status(200).json({ message: 'Quiz submitted!', quizResultId: savedQuizResult._id });
    }
  });
});

// Add this endpoint to get the latest quiz result
app.get('/api/user/quiz/result/latest', (req, res) => {
  QuizResult.findOne().sort({ '_id': -1 }).exec((err, quizResult) => {
    if (err) {
      res.status(500).send('Error fetching latest quiz result.');
    } else {
      res.status(200).json(quizResult);
    }
  });
});


// -------------------------------------I ADD THIS CODE--------------------
const Role = db.role;
db.mongoose
  .connect(DBUri.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "creator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'creator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
