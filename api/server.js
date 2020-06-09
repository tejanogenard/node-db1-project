const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

const accountRouter = require("./accountsRouter.js")

server.use(express.json());

server.use("/accounts", accountRouter)


module.exports = server;
 