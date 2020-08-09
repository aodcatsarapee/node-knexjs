const assessControlModel = require("../model/assesscontrol.model");
module.exports = {
  getAssessControl: (req, res) => {
    let assesscontrol = {
      response: true,
      data: []
    };
    const data_token = req.jwt_session
    assessControlModel
      .getAssessControl(data_token.user.role_id)
      .then((data) => {
        data.forEach((group_menu) => {
          assessControlModel
            .getMenu(group_menu.group_menu_id, data_token.user.role_id)
            .then((data_menu) => {
              assesscontrol['data'].push({
                group_menu: {
                  group_menu_id: group_menu.group_menu_id,
                  group_menu_icon: group_menu.group_menu_icon,
                  group_menu_name: group_menu.group_menu_name,
                  menu: data_menu,
                },
              });
              if (data.length === assesscontrol.data.length) {
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
  },
  checkRole: (req, res) => {
    const data_token = req.jwt_session
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
  },
  getRole: (req, res) => {
    assessControlModel
      .getRole()
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

  },
  getMyMenu: (req, res) => {
    let assesscontrol = [];
    const data_token = req.jwt_session
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
};
