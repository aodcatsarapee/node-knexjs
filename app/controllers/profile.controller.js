const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const profileModel = require("../model/profile.model");
// date time
const moment = require("moment");
const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
module.exports = {
  updateProfile: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err, data_token) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        let update_data = {
          user_fullname: req.body.user_fullname,
          user_email: req.body.user_email,
          user_address: req.body.user_address,
          user_tel: req.body.user_tel,
          user_update: myDate,
        };
        profileModel
          .updateProfile(data_token.user.user_id, update_data)
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
  },
};
