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
        let data = {
          response: true,
          message: "OK 200",
          data: [],
        };
        res.send(data);
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
        let data = {
          response: true,
          message: "OK 200",
          data: [],
        };
        res.send(data);
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
        let data = {
          response: true,
          message: "OK 200",
          data: [],
        };
        res.send(data);
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
        let data = {
          response: true,
          message: "OK 200",
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
        let data = {
          response: true,
          message: "OK 200",
          data: [],
        };
        res.send(data);
      }
    });
  },
};
