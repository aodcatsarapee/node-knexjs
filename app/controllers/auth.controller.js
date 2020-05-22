const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const authModel = require("../model/auth.model");
module.exports = {
  login: (req, res) => {
    let user_username = crypto
      .createHash("sha256")
      .update(req.body.user_username + req.body.user_password)
      .digest("base64");
    authModel
      .login(req.body.user_username, user_username)
      .then((data) => {
        if (data.length === 1) {
          let user = {
            user_id: data[0].user_id,
            role_id: data[0].role_id,
          };
          jwt.sign(
            { user },
            env.SECRETKEY,
            { expiresIn: "12h" },
            (err, token) => {
              if (!err) {
                res.send({
                  token,
                  user: data[0],
                });
              } else {
                res.sendStatus(401);
              }
            }
          );
        } else {
          res.sendStatus(401);
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
};
