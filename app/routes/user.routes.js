const auth = require("../../middleware/verifytoken")
module.exports = function (app) {
  const user = require("../controllers/user.controller");
  app.get("/getuser", auth.verifyToken, user.getUser);
  app.get("/getuserbyid", auth.verifyToken, user.getUserByID);
  app.get("/checkusername", auth.verifyToken, user.checkUsername);
  app.post("/adduser", auth.verifyToken, user.addUser);
  // app.post("/edituser", user.EditUser);
  // app.post("/updateuserpassword", user.UpdateUserPassword);
  // app.post("/deleteuser", user.DeleteUser);
};