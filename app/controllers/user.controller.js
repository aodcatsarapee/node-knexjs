const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const userModel = require("../model/user.model");
module.exports = {
  getUser: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        res.sendStatus(401);
      } else {
        (async () => {
          let count = 0;
          let datas = [];
          await userModel
            .countUser(req)
            .then((data) => {
              count = data.length;
            })
            .catch((error) => {
              res.status(500).send(error);
            });
          await userModel
            .getUser(req)
            .then((data) => {
              datas = data;
            })
            .catch((error) => {
              res.status(500).send(error);
            });
          res.send({ count, datas });
        })();
      }
    });
  },
  getUserByID: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        res.sendStatus(401);
      } else {
        userModel
          .getUserByID(req)
          .then((data) => {
            res.send(data);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    });
  },
  checkUsername: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        res.sendStatus(401);
      } else {
        userModel
          .checkUsername(req)
          .then((data) => {
            res.send({ data });
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    });
  },
};
