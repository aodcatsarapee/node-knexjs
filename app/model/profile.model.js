const db = require("../../config/db.config");
module.exports = {
  getUser(user_id) {
    return db.select("*").from("user").where("user.user_id", user_id);
  },
  updateProfile(user_id, data) {
    return db("user").update(data).where("user.user_id", user_id);
  },
};
