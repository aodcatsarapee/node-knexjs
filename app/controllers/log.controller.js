const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const logModel = require("../model/log.model");
// date time
const moment = require("moment");
moment.locale("TH")
module.exports = {
  getLogUserLogin: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        (async () => {
          let count = 0;
          let datas = [];
          await logModel
            .countLogUserLogin(req)
            .then((data) => {
              count = data.length;
            })
            .catch((error) => {
              res.status(500).send(error);
            });
          await logModel
            .getLogUserLogin(req)
            .then((data) => {
              data.forEach((row) => {
                datas.push({
                  user_fullname: row.user_fullname,
                  log_text: row.log_text,
                  log_browser: row.log_browser,
                  log_time: moment(row.log_time).add(543, 'year').format('LLL')
                })
              })
            })
            .catch((error) => {
              res.status(500).send(error);
            });

          let data_all = {
            response: true,
            message: "200 OK",
            count: count,
            data: datas
          };
          res.send(data_all);
        })();
      }
    });
  }
};
