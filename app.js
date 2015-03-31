var express = require("express");
var app = express();
var path = require("path");

//-- routes
app.use("/", require(path.join(__dirname, "routes", "home")));
app.use("/", require(path.join(__dirname, "routes", "message")));

//-- main
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Listening at http://%s:%s", host, port);

});
