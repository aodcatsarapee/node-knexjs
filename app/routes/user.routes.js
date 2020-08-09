module.exports = function (app) {
  const auth = require("../../middleware/verifytoken")
  const user = require("../controllers/user.controller");
  app.get("/getuser", auth.verifyToken, user.getUser);
  app.get("/getuserbyid", auth.verifyToken, user.getUserByID);
  app.get("/checkusername", auth.verifyToken, user.checkUsername);
  app.post("/adduser", auth.verifyToken, user.addUser);
  app.post("/updateuser", auth.verifyToken, user.updateUser);
  app.post("/updateuserpassword", auth.verifyToken, user.updateUserPassword);
  app.post("/deleteuser", auth.verifyToken, user.deleteUser);
};