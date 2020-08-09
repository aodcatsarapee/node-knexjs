const express = require("express");
const bodypaarser = require("body-parser");
const morgan = require('morgan')


const requestIp = require('request-ip');
const port = process.env.PORT || 8080;
module.exports = function () {
  express.application.prefix = express.Router.prefix = function (path, configure) {
    var router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
  };
  const app = express();
  app.use(morgan('combined')) // log console
  app.use(bodypaarser.urlencoded({ extended: false }));
  app.use(bodypaarser.json());
  app.use(requestIp.mw())
  // allow cors
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
  // allow file
  app.use('/assets/upload/user', express.static('assets/upload/user'))
  // get routes
  app.prefix('/api/v1', (routes) => {
    require("../app/routes/user.routes")(routes);
    require("../app/routes/auth.routes")(routes);
    require("../app/routes/assesscontrol.routes")(routes);
    require("../app/routes/profile.routes")(routes);
    require("../app/routes/role.routes")(routes);
    require("../app/routes/groupmenu.routes")(routes);
    require("../app/routes/menu.routes")(routes);
    require("../app/routes/systemlog.routes")(routes);
    require("../app/routes/log.routes")(routes);
  });

  // add health check path
  app.get("/api/v1/gettest", (req, res) => {
    setTimeout(
      () => {
        res.send({
          response: true,
          data: {
            object__: [
              { message: 'wtf-bank001' },
              { message: 'wtf-bank002' },
              { message: 'wtf-bank003' },
              { message: 'wtf-bank004' },
              { message: 'wtf-bank005' },
              { message: 'wtf-bank006' },
            ]
          }
        });
      }, 1000
    );

  });
  app.get("/api/v1", (req, res) => {
    res.send({
      data: 'hello mother fuck guy.'
    });
  });
  app.get("/", (req, res) => {
    res.send({
      data: 'hello mother fuck guy.'
    });
  });


  const server = app.listen(port, function () {
    console.log('running in port http://localhost:' + port)
  })

  return app;
};
