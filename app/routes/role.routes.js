const auth = require("../../middleware/verifytoken")
module.exports = function (app) {
  const role = require("../controllers/role.controller");
  app.get("/role/getlistrole", auth.verifyToken, role.getListRole);
  app.get("/role/getlistmenu", auth.verifyToken, role.getListMenu);
  app.post("/role/updatemapmenurole", auth.verifyToken, role.updateMapMenuRole);
};