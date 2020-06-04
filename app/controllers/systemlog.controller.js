const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const systemLogModel = require("../model/systemlog.model");
// date time
const moment = require("moment");
module.exports = {
  addLogUserLogin: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        let data_add = {
          user_id: req.body.user_id,
          log_text: req.body.log_text,
          log_browser: req.body.agent,
          log_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };
        systemLogModel
          .addLogUserLogin(data_add)
          .then(() => {
            let data = {
              response: true,
              message: "200 OK",
              data: [],
            };
            res.send(data);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    });
  }
};
