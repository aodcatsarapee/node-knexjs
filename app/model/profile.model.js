const db = require("../../config/db.config");
module.exports = {
  getUser(user_id) {
    return db
      .select("*")
      .from("user")
      .join("role", "role.role_id", "=", "user.role_id")
      .join(
        "ref_user_status",
        "ref_user_status.user_status_id",
        "=",
        "user.user_status_id"
      )
      .where("user.user_id", user_id);
  },
  updateProfile(user_id, data) {
    return db("user").update(data).where("user.user_id", user_id);
  },
};
