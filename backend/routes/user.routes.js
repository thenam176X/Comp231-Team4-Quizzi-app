const { verifySignUp, authJwt } = require("../middlewares");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);

  app.post("/api/auth/signout", authController.signout);

  app.post("/api/user/getAllQuiz", userController.getAllQuizzes);
  app.post("/api/user/quiz", userController.addQuiz);
  app.post("/api/user/quizById", userController.getQuizById);
  app.get("/api/user/quiz/latest", userController.getLatestQuiz);
  app.post("/api/user/quiz/submit", userController.submitQuiz);

  app.get('/api/user/:id', userController.getUsers);
  app.post('/api/user', userController.createUser);
  app.put('/api/user/:id', userController.updateUser);
  app.delete('/api/user/:id', userController.deleteUser);
  app.post('/api/user/:id/profile', userController.saveProfile);
};
