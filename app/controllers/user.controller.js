const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const userModel = require("../model/user.model");
module.exports = {
  getUser: (req, res) => {
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
  },
  getUserByID: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
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
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
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
