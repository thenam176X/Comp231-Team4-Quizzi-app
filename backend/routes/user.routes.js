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

  app.get(
    "/api/user/quiz",
    [authJwt.verifyToken],
    userController.getAllQuizzes
  );
 
};
