const express = require('express');

const server = express();

const UsersRouter = require('../users/users-router');

server.use(express.json());
server.use('/users', UsersRouter);

module.exports = server;
