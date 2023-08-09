const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./models");
const DBUri = require("./config/db.config");

// routes for question add and retrive questions
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quizRoutes');
const quizDataRoutes = require('./routes/quizDataRoutes');
const quizHistoryRoutes = require('./quizHistoryRoutes');
const quizDetailsRoutes = require('./quizDetailsRoutes'); 
const quizAnalyticsRoutes = require('./quizAnalyticsRoutes');
const answerRoutes = require('./answerRoutes');

// route for submit answers
const quizSubmissionRoutes = require('./routes/quizSubmissionRoutes');

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




// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', quizRoutes); // for add question and ans in database
app.use('/api', quizDataRoutes); // for retrive quiz and ans from database
app.use('/api',quizSubmissionRoutes); // for submitting and with question id and user id 
app.use('/quiz-history', quizHistoryRoutes); // for retrive the quiz histoty 
app.use('/quiz-details', quizDetailsRoutes); // get quiz details 
app.use('/quiz-analytics', quizAnalyticsRoutes); // get quiz analytics
app.use('/answers', answerRoutes); // save ans in database according to user type