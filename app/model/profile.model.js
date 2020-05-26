const db = require("../../config/db.config");
module.exports = {
  updateProfile(user_id, data) {
    return db("user").update(data).where("user.user_id", user_id);
  },
};
