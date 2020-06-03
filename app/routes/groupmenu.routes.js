const auth = require("../../middleware/verifytoken")
module.exports = function (app) {
  const groupmenu = require("../controllers/groupmenu.controller");
  app.get("/groupmenu/list", auth.verifyToken, groupmenu.list);
  app.get("/groupmenu/getgroupmenubyid", auth.verifyToken, groupmenu.getGroupMenuByID);
  app.post("/groupmenu/add", auth.verifyToken, groupmenu.add);
  app.post("/groupmenu/update", auth.verifyToken, groupmenu.update);
  app.post("/groupmenu/delete", auth.verifyToken, groupmenu.delete);
};