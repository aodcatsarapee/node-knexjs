const jwt = require("jsonwebtoken");
const env = require("../config/env");

module.exports = {
  verifyToken: (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      /**
       * 
       * 
       * Handle verify token
       * 
       */
      jwt.verify(req.token, env.SECRETKEY, (err, data_token) => {
        if (err) {
          let data = {
            response: false,
            message: "401 Unauthorized",
            data: [],
          };
          res.send(data);
        } else {
          req.jwt_session = data_token
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  }
}