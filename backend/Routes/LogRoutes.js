const express = require("express");
const { AddLog, AllLogs } = require("../Controller/LogController");
const LogRouter = express.Router();

LogRouter.route("/Create").post(AddLog);
LogRouter.route("/").get(AllLogs);


module.exports = LogRouter;