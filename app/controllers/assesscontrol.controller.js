const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const assessControlModel = require("../model/assesscontrol.model");
module.exports = {
  getAssessControl: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err, data_token) => {
      if (err) {
        res.sendStatus(401);
      } else {
        let assesscontrol = [];
        assessControlModel
          .getAssessControl(data_token.user.role_id)
          .then((data) => {
            data.forEach((group_menu) => {
              assessControlModel
                .getMenu(group_menu.group_menu_id, data_token.user.role_id)
                .then((data_menu) => {
                  assesscontrol.push({
                    group_menu: {
                      group_menu_id: group_menu.group_menu_id,
                      group_menu_icon: group_menu.group_menu_icon,
                      group_menu_name: group_menu.group_menu_name,
                      menu: data_menu,
                    },
                  });
                  if (data.length === assesscontrol.length) {
                    res.send(assesscontrol);
                  }
                })
                .catch((error) => {
                  res.status(500).send(error);
                });
            });
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    });
  },
  checkRole: (req, res) => {
    jwt.verify(req.token, env.SECRETKEY, (err, data_token) => {
      if (err) {
        res.sendStatus(401);
      } else {
        assessControlModel
          .checkRole(data_token.user.role_id, req.body.menu_id)
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
};
