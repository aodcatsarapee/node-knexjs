const db = require("../../config/db.config")
module.exports = {
  countLogUserLogin(req) {
    return (
      db.select("log_user_login.log_id")
        .from("log_user_login")
        .join("user", "user.user_id", "log_user_login.user_id")
        .where(function () {
          if (req.query.search != "") {
            this.where('user.user_id', 'like', '%' + req.query.search + '%')
            this.orWhere('user.user_username', 'like', '%' + req.query.search + '%')
            this.orWhere('user.user_fullname', 'like', '%' + req.query.search + '%')
            this.orWhere('log_user_login.log_text', 'like', '%' + req.query.search + '%')
            this.orWhere('log_user_login.log_browser', 'like', '%' + req.query.search + '%')
          }
        }).where(function () {
          if (req.query.searchdate != "") {
            this.where('log_user_login.log_time', '>=', req.query.searchdate + ' 00:00:00')
            this.where('log_user_login.log_time', '<=', req.query.searchdate + ' 23:59:59')
          }
        })
    )
  },
  getLogUserLogin(req) {
    return (
      db.select("log_user_login.log_text", " log_user_login.log_browser", "log_user_login.log_time", "user.user_fullname")
        .from("log_user_login")
        .join("user", "user.user_id", "log_user_login.user_id")
        .where(function () {
          if (req.query.search != "") {
            this.where('user.user_id', 'like', '%' + req.query.search + '%')
            this.orWhere('user.user_username', 'like', '%' + req.query.search + '%')
            this.orWhere('user.user_fullname', 'like', '%' + req.query.search + '%')
            this.orWhere('log_user_login.log_text', 'like', '%' + req.query.search + '%')
            this.orWhere('log_user_login.log_browser', 'like', '%' + req.query.search + '%')
          }
        }).where(function () {
          if (req.query.searchdate != "") {
            this.where('log_user_login.log_time', '>=', req.query.searchdate + ' 00:00:00')
            this.where('log_user_login.log_time', '<=', req.query.searchdate + ' 23:59:59')
          }
        }).offset(req.query.offset)
        .limit(req.query.limit)
        .orderBy('log_user_login.log_time', 'desc')
    )
  },
}