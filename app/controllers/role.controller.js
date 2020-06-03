const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const roleModel = require("../model/role.model");
module.exports = {
  getListRole: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        roleModel
          .getListRole()
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
  getListMenu: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        let data_menu = [];
        roleModel
          .getListMenu()
          .then((row) => {
            row.forEach((row_menu) => {
              roleModel
                .checkMaproleMenu(req.query.role_id, row_menu.menu_id).then((row_check) => {
                  data_menu.push({
                    menu: row_menu,
                    check: row_check.length
                  });
                  if (row.length === data_menu.length) {
                    res.send(data_menu);
                  }
                })
                .catch((error) => {
                  res.status(500).send(error);
                });
            })
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    });
  },
  addMapMenuRole: (req, res) => {
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
          role_id: req.body.role_id,
          menu_id: req.body.menu_id,
        }
        roleModel
          .addMapMenuRole(data_add)
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
  deleteMapMenuRole: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err) => {
      if (err) {
        let data = {
          response: false,
          message: "401 Unauthorized",
          data: [],
        };
        res.send(data);
      } else {
        roleModel
          .deleteMapMenuRole(req.body.role_id, req.body.menu_id)
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
