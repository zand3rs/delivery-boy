var express = require("express");
var router = express.Router();
var path = require("path");
var Queue = require(path.join("..", "helpers", "queue"));

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
  var queue = new Queue(channel);

  console.log("channel: ", channel);
  console.log("message: ", message);

  queue.push(message, function(err) {
    res.json(err || "OK");
  });
}

//------------------------------------------------------------------------------

function recv(req, res, next) {
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<");
  console.log("recv");

  var channel = req.query["channel"];
  var queue = new Queue(channel);

  queue.pop(function(err, message) {
    console.log("channel: ", channel);
    console.log("message: ", message);

    res.json(err || message);
  });
}

//==============================================================================
