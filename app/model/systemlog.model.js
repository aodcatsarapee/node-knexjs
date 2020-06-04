const db = require("../../config/db.config")
module.exports = {
  addLogUserLogin(data) {
    return db("log_user_login").insert(data);
  }

}