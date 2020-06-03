const auth = require("../../middleware/verifytoken")
module.exports = function (app) {
  const role = require("../controllers/role.controller");
  app.get("/getlistrole", auth.verifyToken, role.getListRole);
  // app.get("/getuserbyid", auth.verifyToken, user.getUserByID);
  // app.get("/checkusername", auth.verifyToken, user.checkUsername);
  // app.post("/adduser", auth.verifyToken, user.addUser);
  // app.post("/updateuser", auth.verifyToken, user.updateUser);
  // app.post("/updateuserpassword", auth.verifyToken, user.updateUserPassword);
  // app.post("/deleteuser", auth.verifyToken, user.deleteUser);
};