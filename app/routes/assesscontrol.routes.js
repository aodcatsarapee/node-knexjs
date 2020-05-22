const auth = require("../../middleware/verifytoken");
module.exports = function (app) {
  const assesscontrol = require("../controllers/assesscontrol.controller");
  app.get(
    "/getAssessControl",
    auth.verifyToken,
    assesscontrol.getAssessControl
  );
  app.get("/checkRole", auth.verifyToken, assesscontrol.checkRole);
};
