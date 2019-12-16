const express = require('express');

const server = express();

const UsersRouter = require('../users/users-router');
const AuthRouter = require('../auth/auth-router');

server.use(express.json());
server.use('/users', UsersRouter);
server.use('/auth', AuthRouter);

module.exports = server;
