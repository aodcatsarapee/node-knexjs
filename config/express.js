const express = require("express");
const bodypaarser = require("body-parser");
module.exports = function () {
  const app = express();
  app.use(bodypaarser.json());
  // allow cors
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
  app.use(express.static("assets/upload/user"));
  require("../app/routes/user.routes")(app);
  require("../app/routes/auth.routes")(app);
  require("../app/routes/assesscontrol.routes")(app);
  return app;
};
