const db = require("../../config/db.config")
module.exports = {
  login(user_username, user_password) {
    return (
      db.select("user.user_id", "user.role_id", "user.user_status_id", "user.user_username", "user.user_email", "user.user_fullname", "user.user_address", "user.user_tel", "user.user_image", "role.role_name", "ref_user_status.user_status_name")
        .from("user")
        .join("role", "role.role_id", "=", "user.role_id")
        .join("ref_user_status", "ref_user_status.user_status_id", "=", "user.user_status_id")
        .where("user.user_username", user_username)
        .where("user.user_password", user_password)
    )
  }
}

