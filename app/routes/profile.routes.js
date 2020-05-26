const auth = require("../../middleware/verifytoken");
module.exports = function (app) {
  const profile = require("../controllers/profile.controller");
  app.post("/updateProfile", auth.verifyToken, profile.updateProfile);
  app.post("/uploadProfile", auth.verifyToken, profile.uploadProfile);
  app.post("/updatePassword", auth.verifyToken, profile.updatePassword);
};
