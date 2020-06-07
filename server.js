const express = require("./config/express");
const app = express();
app.listen(8080);
// app.listen(process.env.PORT);
module.exports = app;
console.log("Server running at http://localhost:8080");
