module.exports = function (app) {
  const auth = require("../controllers/auth.controller");
  app.post("/login", auth.login);
};