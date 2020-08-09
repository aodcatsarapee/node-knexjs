const userModel = require("../model/user.model");

// date time
const moment = require("moment");
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

// helper เอาไว้ป้องกัน short link
const helper = require('../model/helper')
const menu_id = 23
//
module.exports = {
  getUser: async (req, res) => {
    // check access to menu
    let flag_access = await helper.checkRole(req, menu_id);
    if (!flag_access) {
      res.status(401).send('error access to endpoint');
    }
    //
    const { search, user_status_id, role_id, offset, limit } = req.query
    // count all search
    let count_all = await userModel.getUser(search, user_status_id, role_id, null, 100000).then((data) => {
      return data.length
    })
    // split page
    userModel.getUser(search, user_status_id, role_id, offset, limit).then((data) => {
      res.send({
        response: true,
        message: "200 OK",
        count: count_all,
        data: data
      });
    }).catch((error) => {
      res.status(500).send(error);
    });
  },
  getUserByID: async (req, res) => {
    // check access to menu
    let flag_access = await helper.checkRole(req, menu_id);
    if (!flag_access) {
      res.status(401).send('error access to endpoint');
    }
    //
    userModel
      .getUserByID(req.query.user_id)
      .then((data_user) => {
        res.send({
          response: true,
          message: "200 OK",
          data: {
            role_id: data_user[0].role_id,
            role_name: data_user[0].role_name,
            user_id: data_user[0].user_id,
            user_username: data_user[0].user_username,
            user_fullname: data_user[0].user_fullname,
            user_address: data_user[0].user_address,
            user_email: data_user[0].user_email,
            user_image: data_user[0].user_image,
            user_status_id: data_user[0].user_status_id,
            user_status_name: data_user[0].user_status_name,
            user_tel: data_user[0].user_tel,
            user_create: moment(data_user[0].user_create).format("YYYY-MM-DD HH:mm:ss")
          },
        });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  checkUsername: async (req, res) => {
    // check access to menu
    let flag_access = await helper.checkRole(req, menu_id);
    if (!flag_access) {
      res.status(401).send('error access to endpoint');
    }
    //
    const { user_username } = req.query
    userModel.checkUsername(user_username).then((data_user) => {
      if (data_user.length === 1) {
        let data = {
          response: true,
          status: 0,
          message: "username นี้มีผู้ใช้งานนี้เเล้ว",
          data: []
        };
        res.send(data);
      } else {
        let data = {
          response: true,
          status: 1,
          message: "สามารถใช้ username นี้ได้",
          data: []
        };
        res.send(data);
      }
    }).catch((error) => {
      res.status(500).send(error);
    });
  },
  addUser: async (req, res) => {
    // check access to menu
    let flag_access = await helper.checkRole(req, menu_id);
    if (!flag_access) {
      res.status(401).send('error access to endpoint');
    }
    //
    upload(req, res, function () {
      let user_password_add = crypto
        .createHash("sha256")
        .update(
          req.body.user_username + req.body.user_password
        )
        .digest("base64");
      let data_add = {
        user_username: req.body.user_username,
        user_password: user_password_add,
        user_email: req.body.user_email,
        user_fullname: req.body.user_fullname,
        user_address: req.body.user_address,
        user_tel: req.body.user_tel,
        role_id: req.body.role_id,
        user_status_id: 1,
        user_image: (typeof req.file !== "undefined" ? req.file.filename : "none.png"),
        user_create: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
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
    })
  },
  updateUser: async (req, res) => {
    // check access to menu
    let flag_access = await helper.checkRole(req, menu_id);
    if (!flag_access) {
      res.status(401).send('error access to endpoint');
    }
    //
    upload(req, res, function () {
      if (typeof req.file !== "undefined") {
        // upload แบบ มีการแก้รูปภาพ
        userModel
          .getUserByID(req.body.user_id)
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
            let data_update = {
              user_email: req.body.user_email,
              user_fullname: req.body.user_fullname,
              user_address: req.body.user_address,
              user_tel: req.body.user_tel,
              role_id: req.body.role_id,
              user_status_id: req.body.user_status_id,
              user_image: req.file.filename, // update image
              user_update: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            }
            userModel
              .updateUser(req.body.user_id, data_update)
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
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      } else {
        let data_update = {
          user_email: req.body.user_email,
          user_fullname: req.body.user_fullname,
          user_address: req.body.user_address,
          user_tel: req.body.user_tel,
          role_id: req.body.role_id,
          user_status_id: req.body.user_status_id,
          user_update: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        }
        userModel
          .updateUser(req.body.user_id, data_update)
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
  },
  updateUserPassword: async (req, res) => {
    // check access to menu
    let flag_access = await helper.checkRole(req, menu_id);
    if (!flag_access) {
      res.status(401).send('error access to endpoint');
    }
    //
    if (req.body.user_password_new !== "" && req.body.user_password_confirm !== "") { // เช็ค null
      if (req.body.user_password_new === req.body.user_password_confirm) { // check ว่าเหมือนกันมั้ย
        userModel
          .getUserByID(req.body.user_id)
          .then((data_user) => {
            let user_password_add = crypto
              .createHash("sha256")
              .update(
                data_user[0].user_username + req.body.user_password_new
              )
              .digest("base64");
            let update_data = {
              user_password: user_password_add,
              user_update: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            };
            userModel
              .updateUser(req.body.user_id, update_data)
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

          }).catch((error) => {
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
        message: "204 No Content",
        data: [],
      };
      res.send(data);
    }
  },
  deleteUser: async (req, res) => {
    // check access to menu
    let flag_access = await helper.checkRole(req, menu_id);
    if (!flag_access) {
      res.status(401).send('error access to endpoint');
    }
    //
    userModel.getUserByID(req.body.user_id)
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
        userModel
          .deleteUser(req.body.user_id)
          .then(() => {
            let data = {
              response: true,
              message: "ดำเนินการเรียบร้อยเเล้ว",
              data: [],
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
  },
};
