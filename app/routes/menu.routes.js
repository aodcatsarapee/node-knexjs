const auth = require("../../middleware/verifytoken");
module.exports = function (app) {
  const menu = require("../controllers/menu.controller");
  app.get("/menu/list", auth.verifyToken, menu.list);
  app.get("/menu/getmenubyid", auth.verifyToken, menu.getMenuByID);
  app.post("/menu/add", auth.verifyToken, menu.add);
  app.post("/menu/update", auth.verifyToken, menu.update);
  app.post("/menu/sort", auth.verifyToken, menu.sort);
  app.post("/menu/delete", auth.verifyToken, menu.delete);
};