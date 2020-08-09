const db = require("../../config/db.config")
module.exports = {
  getUser(search = "", user_status_id = 0, role_id = 0, offset = 0, limit = 10000) {
    const query_count = db.select("user.user_id")
    const query_selecct = db.
      select("user.user_id", "user.role_id", "user.user_status_id",
        "user.user_username", "user.user_email", "user.user_fullname", "user.user_address",
        "user.user_tel", "user.user_image", "role.role_name", "ref_user_status.user_status_name")
    return (
      (offset == null ? query_count : query_selecct)
        .from("user")
        .join("role", "role.role_id", "=", "user.role_id")
        .join("ref_user_status", "ref_user_status.user_status_id", "=", "user.user_status_id")
        .where(function () {
          if (search != "") {
            this.where('user.user_id', 'like', '%' + search + '%')
            this.orWhere('user.user_username', 'like', '%' + search + '%')
            this.orWhere('user.user_fullname', 'like', '%' + search + '%')
          }
        }).where(function () {
          if (user_status_id != 0) {
            this.where('user.user_status_id', user_status_id)
          }
        }).where(function () {
          if (role_id != 0) {
            this.where('user.role_id', role_id)
          }
        })
        .offset(offset)
        .limit(limit)
        .orderBy('user.user_id', 'desc')
    )
  },
  getUserByID(user_id) {
    return (
      db.select("*")
        .from("user")
        .join("role", "role.role_id", "=", "user.role_id")
        .join("ref_user_status", "ref_user_status.user_status_id", "=", "user.user_status_id")
        .where('user.user_id', user_id)
    )
  },
  checkUsername(user_username) {
    return (
      db.select("user.user_id")
        .from("user")
        .where("user.user_username", user_username)
    )
  },
  addUser(data) {
    return db("user").insert(data);
  },
  updateUser(user_id, data) {
    return db("user").update(data).where("user.user_id", user_id);
  },
  deleteUser(user_id) {
    return db("user").where("user.user_id", user_id).del();
  }
}