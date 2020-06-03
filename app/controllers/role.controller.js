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
        (async () => {
          let menuID = [];
          let data_menu = [];
          await roleModel
            .getListMenu(req.query.role_id)
            .then(async (rows) => {
              rows.forEach(row => {
                menuID.push(row.menu_id);
                data_menu.push({
                  menu_id: row.menu_id,
                  menu_name: row.menu_name,
                  group_menu_id: row.group_menu_id,
                  group_menu_name: row.group_menu_name,
                  role_id: row.role_id,
                });
              })
            })
            .catch((error) => {
              res.status(500).send(error);
            });
          await roleModel
            .getListMenuNotin(menuID)
            .then(async (rows) => {
              rows.forEach(row => {
                data_menu.push({
                  menu_id: row.menu_id,
                  menu_name: row.menu_name,
                  group_menu_id: row.group_menu_id,
                  group_menu_name: row.group_menu_name,
                  role_id: "",
                });
              })
            })
            .catch((error) => {
              res.status(500).send(error);
            });
          let data = {
            response: true,
            message: "200 OK",
            data: data_menu,
          };
          res.send(data);
        })();
      }
    });
  },
  updateMapMenuRole: (req, res) => {
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
          .checkMapMemuRole(req.body.role_id, req.body.menu_id)
          .then((row_check) => {
            if (row_check.length === 0) {
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
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    });
  },
};
