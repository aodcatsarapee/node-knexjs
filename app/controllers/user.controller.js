const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const userModel = require("../model/user.model");

// date time
const moment = require("moment");
const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

// upload file
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/upload/user");
  },
  filename: function (req, file, cb) {
    let fileExtension = file.originalname.split(".")[1];
    cb(null, "user_" + Date.now() + "." + fileExtension);
  },
});
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  cb(null, true);
};
const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 2000000,
  },
}).single("user_image");
// file
let fs = require("fs");
// crypto
const crypto = require("crypto");

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
  addUser: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        upload(req, res, function () {
          let user_password_add = crypto
            .createHash("sha256")
            .update(
              req.body.user_username + req.body.user_password
            )
            .digest("base64");
          if (typeof req.file !== "undefined") {
            let data_add = {
              user_username: req.body.user_username,
              user_password: user_password_add,
              user_email: req.body.user_email,
              user_fullname: req.body.user_fullname,
              user_address: req.body.user_address,
              user_tel: req.body.user_tel,
              role_id: req.body.role_id,
              user_status_id: 1,
              user_image: req.file.filename,
              user_create: myDate,
            }
            userModel
              .addUser(data_add)
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
          } else {
            let data_add = {
              user_username: req.body.user_username,
              user_password: user_password_add,
              user_email: req.body.user_email,
              user_fullname: req.body.user_fullname,
              user_address: req.body.user_address,
              user_tel: req.body.user_tel,
              role_id: req.body.role_id,
              user_status_id: 1,
              user_image: "none.png",
              user_create: myDate,
            }
            userModel
              .addUser(data_add)
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
        })
      }
    });
  },
};
