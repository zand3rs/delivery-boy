var express = require("express");
var router = express.Router();

//==============================================================================

module.exports = router;

router.get("/", home);

//==============================================================================

function home(req, res, next) {
  res.send("Welcome!");
}

//==============================================================================