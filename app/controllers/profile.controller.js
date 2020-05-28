const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const profileModel = require("../model/profile.model");
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
  /**
   * @api {post} updateprofile Update Profile
   * @apiVersion 0.0.1
   * @apiDescription  API ของ Update Profile
   * @apiGroup Profile
   * @apiHeaderExample {json} Header-Example:
   *    {
   *      "Authorization": ""
   *    }
   * @apiParamExample {json} Body:
   * {
   *       "user_fullname": "",
   *       "user_email": "",
   *       "user_address": "",
   *       "user_tel": "",
   * }
   * @apiSuccessExample {json} Success-Response:
   *  {
   *   "response": true,
   *   "message": "200 OK"
   * }
   */
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
            profileModel
              .getUser(data_token.user.user_id)
              .then((data_user) => {
                let data = {
                  response: true,
                  message: "200 OK",
                  data: {
                    role_id: data_user[0].role_id,
                    role_name: data_user[0].role_name,
                    user_address: data_user[0].user_address,
                    user_email: data_user[0].user_email,
                    user_fullname: data_user[0].user_fullname,
                    user_id: data_user[0].user_id,
                    user_image: data_user[0].user_image,
                    user_status_id: data_user[0].user_status_id,
                    user_status_name: data_user[0].user_status_name,
                    user_tel: data_user[0].user_tel,
                    user_username: data_user[0].user_username,
                  },
                };
                res.send(data);
              })
              .catch((error) => {
                res.status(500).send(error);
              });
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    });
  },
  /**
   * @api {post} uploadprofile Upload Profile
   * @apiVersion 0.0.1
   * @apiDescription  API ของ Upload Profile
   * @apiGroup Profile
   * @apiHeaderExample {json} Header-Example:
   *    {
   *      "Authorization": ""
   *    }
   * @apiParamExample {json} Body:
   * {
   *       "user_image": ""
   * }
   * @apiSuccessExample {json} Success-Response:
   *  {
   *   "response": true,
   *   "message": "200 OK"
   * }
   */
  uploadProfile: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err, data_token) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        upload(req, res, function () {
          if (typeof req.file !== "undefined") {
            profileModel
              .getUser(data_token.user.user_id)
              .then((data_user) => {
                if (data_user[0].user_image != "none.png") {
                  fs.unlink(
                    "assets/upload/user/" + data_user[0].user_image,
                    function (err) {
                      if (err) return console.log(err);
                      console.log("file deleted successfully");
                    }
                  );
                }
                let update_data = {
                  user_image: req.file.filename,
                  user_update: myDate,
                };
                profileModel
                  .updateProfile(data_token.user.user_id, update_data)
                  .then(() => {
                    let data = {
                      response: true,
                      message: "200 OK",
                      data: {
                        role_id: data_user[0].role_id,
                        role_name: data_user[0].role_name,
                        user_address: data_user[0].user_address,
                        user_email: data_user[0].user_email,
                        user_fullname: data_user[0].user_fullname,
                        user_id: data_user[0].user_id,
                        user_image: req.file.filename,
                        user_status_id: data_user[0].user_status_id,
                        user_status_name: data_user[0].user_status_name,
                        user_tel: data_user[0].user_tel,
                        user_username: data_user[0].user_username,
                      },
                    };
                    res.send(data);
                  })
                  .catch((error) => {
                    res.status(500).send(error);
                  });
              })
              .catch((error) => {
                res.status(500).send(error);
              });
          } else {
            let data = {
              response: true,
              message: "204 No Content",
              data: [],
            };
            res.send(data);
          }
        });
      }
    });
  },
  /**
   * @api {post} updatepassword Update Password
   * @apiVersion 0.0.1
   * @apiDescription  API ของ Upload Password
   * @apiGroup Profile
   * @apiHeaderExample {json} Header-Example:
   *    {
   *      "Authorization": ""
   *    }
   * @apiParamExample {json} Body:
   * {
   *       "user_password": "",
   *       "user_password_new": "",
   *       "user_password_confirm": ""
   * }
   * @apiSuccessExample {json} Success-Response:
   *  {
   *   "response": true,
   *   "message": "200 OK"
   * }
   */
  updatePassword: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err, data_token) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        if (
          req.body.user_password !== "" &&
          req.body.user_password_new !== "" &&
          req.body.user_password_confirm !== ""
        ) {
          profileModel
            .getUser(data_token.user.user_id)
            .then((data_user) => {
              let user_password_check = crypto
                .createHash("sha256")
                .update(data_user[0].user_username + req.body.user_password)
                .digest("base64");
              if (user_password_check === data_user[0].user_password) {
                if (
                  req.body.user_password_new === req.body.user_password_confirm
                ) {
                  let user_password_add = crypto
                    .createHash("sha256")
                    .update(
                      data_user[0].user_username + req.body.user_password_new
                    )
                    .digest("base64");

                  let update_data = {
                    user_password: user_password_add,
                    user_update: myDate,
                  };
                  profileModel
                    .updateProfile(data_token.user.user_id, update_data)
                    .then(() => {
                      let data = {
                        response: true,
                        status: 1,
                        message: "เปลื่ยน Password เรียบร้อยเเล้ว",
                        data: [],
                      };
                      res.send(data);
                    })
                    .catch((error) => {
                      res.status(500).send(error);
                    });
                } else {
                  let data = {
                    response: true,
                    status: 0,
                    message: "Password ไม่ตรงกัน",
                    data: [],
                  };
                  res.send(data);
                }
              } else {
                let data = {
                  response: true,
                  status: 0,
                  message: "Password เดิมไม่ถูกต้อง",
                  data: [],
                };
                res.send(data);
              }
            })
            .catch((error) => {
              res.status(500).send(error);
            });
        } else {
          let data = {
            response: true,
            message: "204 No Content",
            data: [],
          };
          res.send(data);
        }
      }
    });
  },
};
