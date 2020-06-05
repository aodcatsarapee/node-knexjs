const auth = require("../../middleware/verifytoken");
module.exports = function (app) {
  const log = require("../controllers/log.controller");
  app.get("/log/getloguserlogin", auth.verifyToken, log.getLogUserLogin);
};
