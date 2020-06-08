const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const menuModel = require("../model/menu.model");
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
        menuModel
          .getMenu(req.query.group_menu_id)
          .then((row) => {
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
  getMenuByID: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        menuModel
          .getMenuByID(req.query.menu_id)
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
          group_menu_id: req.body.group_menu_id,
          menu_name: req.body.menu_name,
          menu_icon: req.body.menu_icon,
          menu_link: req.body.menu_link,
          menu_status_id: 1,
          menu_openlink: 0,
          menu_sort: req.body.menu_sort,
          menu_create: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };
        menuModel
          .addMenu(data_add)
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
          menu_name: req.body.menu_name,
          menu_icon: req.body.menu_icon,
          menu_link: req.body.menu_link,
          menu_sort: req.body.menu_sort,
          menu_update: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };
        menuModel
          .updateMenu(req.body.menu_id, data_update)
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
          menuModel.updateMenu(row.id, { menu_sort: count }).catch((error) => { res.status(500).send(error); });
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
        menuModel
          .deleteMenu(req.body.menu_id)
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
