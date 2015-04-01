#!/usr/bin/env node

var path = require("path");
var package = require(path.join("..", "package.json"));

var program = require("commander");
var prompt = require("prompt");
var args = process.argv.slice(2);

program
  .version(package.version, "-v, --version")
  .usage("[command] [options]");

program
  .command("start")
  .description("Message delivery service.")
  .action(start);

program.parse(process.argv);
!args.length && program.help();

function start() {
  prompt.colors = false;
  prompt.message = "";
  prompt.delimiter = "";
  prompt.start();

  console.log("Application started.");
}
