var express = require("express");
var router = express.Router();
var path = require("path");
var Courier = require(path.join("..", "lib", "courier"));

//==============================================================================

module.exports = router;

router.get("/send", send);
router.get("/recv", recv);

//==============================================================================

function send(req, res, next) {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log("send");

  var channel = req.query["channel"];
  var message = req.query["message"];
  var courier = new Courier(channel);

  console.log("channel: ", channel);
  console.log("message: ", message);

  courier.send(message, function(err) {
    res.json(err || "OK");
  });
}

//------------------------------------------------------------------------------

function recv(req, res, next) {
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<");
  console.log("recv");

  var channel = req.query["channel"];
  var courier = new Courier(channel);

  courier.recv(function(err, message) {
    console.log("channel: ", channel);
    console.log("message: ", message);

    res.json(err || message);
  });
}

//==============================================================================
