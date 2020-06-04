const auth = require("../../middleware/verifytoken");
module.exports = function (app) {
  const systemlog = require("../controllers/systemlog.controller");
  app.post("/systemlog/addloguserlogin", auth.verifyToken, systemlog.addLogUserLogin);
};
