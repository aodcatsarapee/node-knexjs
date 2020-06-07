const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const groupMenuModel = require("../model/groupmenu.model");
// date time
const moment = require("moment");
module.exports = {
  list: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        groupMenuModel.getGroupMenu().then((row) => {
          let data = {
            response: true,
            message: "200 OK",
            data: row,
          };
          res.send(data);
        })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    });
  },
  getGroupMenuByID: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        groupMenuModel.getGroupMenuByID(req.query.group_menu_id)
          .then((row) => {
            let data = {
              response: true,
              message: "200 OK",
              data: row[0],
            };
            res.send(data);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    });
  },
  add: (req, res) => {
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
          group_menu_name: req.body.group_menu_name,
          group_menu_icon: req.body.group_menu_icon,
          group_menu_sort: req.body.group_menu_sort,
          group_menu_create: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        }
        groupMenuModel
          .addGroupMenu(data_add)
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
  update: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        let data_update = {
          group_menu_name: req.body.group_menu_name,
          group_menu_icon: req.body.group_menu_icon,
          group_menu_sort: req.body.group_menu_sort,
          group_menu_update: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        }
        groupMenuModel
          .updateGroupMenu(req.body.group_menu_id, data_update)
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
  sort: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        let count = 1;
        let list = req.body.list;
        list.forEach(row => {
          groupMenuModel.updateGroupMenu(row.id, { group_menu_sort: count }).catch((error) => { res.status(500).send(error); });
          count++;
        });
        let data = {
          response: true,
          message: "200 OK",
          data: [],
        };
        res.send(data);
      }
    });
  },
  delete: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        groupMenuModel
          .deleteGroupMenu(req.body.group_menu_id)
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
