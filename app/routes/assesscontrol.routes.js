const auth = require("../../middleware/verifytoken");
module.exports = function (app) {
  const assesscontrol = require("../controllers/assesscontrol.controller");
  app.get(
    "/getAssessControl",
    auth.verifyToken,
    assesscontrol.getAssessControl
  );
  app.post("/checkRole", auth.verifyToken, assesscontrol.checkRole);
  app.get("/getRole", auth.verifyToken, assesscontrol.getRole);
};
