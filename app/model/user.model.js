const db = require("../../config/db.config")
module.exports = {
  countUser(req) {
    return (
      db.select("user.user_id")
        .from("user")
        .join("role", "role.role_id", "=", "user.role_id")
        .join("ref_user_status", "ref_user_status.user_status_id", "=", "user.user_status_id")
        .where(function () {
          if (req.query.search != "") {
            this.where('user.user_id', 'like', '%' + req.query.search + '%')
            this.orWhere('user.user_username', 'like', '%' + req.query.search + '%')
            this.orWhere('user.user_fullname', 'like', '%' + req.query.search + '%')
          }
        }).where(function () {
          if (req.query.user_status_id != "") {
            this.where('user.user_status_id', req.query.user_status_id)
          }
        }).where(function () {
          if (req.query.role_id != "") {
            this.where('user.role_id', req.query.role_id)
          }
        })
    )
  },
  getUser(req) {
    return (
      db.select("user.user_id", "user.role_id", "user.user_status_id", "user.user_username", "user.user_email", "user.user_fullname", "user.user_address", "user.user_tel", "user.user_image", "role.role_name", "ref_user_status.user_status_name")
        .from("user")
        .join("role", "role.role_id", "=", "user.role_id")
        .join("ref_user_status", "ref_user_status.user_status_id", "=", "user.user_status_id")
        .where(function () {
          if (req.query.search != "") {
            this.where('user.user_id', 'like', '%' + req.query.search + '%')
            this.orWhere('user.user_username', 'like', '%' + req.query.search + '%')
            this.orWhere('user.user_fullname', 'like', '%' + req.query.search + '%')
          }
        }).where(function () {
          if (req.query.user_status_id != "") {
            this.where('user.user_status_id', req.query.user_status_id)
          }
        }).where(function () {
          if (req.query.role_id != "") {
            this.where('user.role_id', req.query.role_id)
          }
        })
        .offset(req.query.offset)
        .limit(req.query.limit)
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
  checkUsername(req) {
    return (
      db.select("user.user_id")
        .from("user")
        .where("user.user_username", req.query.user_username)
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