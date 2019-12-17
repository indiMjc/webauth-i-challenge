const express = require('express');
const helmet = require('helmet');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex');

const server = express();

const UsersRouter = require('../users/users-router');
const AuthRouter = require('../auth/auth-router');
const knex = require('../data/dbConfig.js');

server.use(helmet());
server.use(express.json());
server.use('/users', UsersRouter);
server.use('/auth', AuthRouter);

module.exports = server;
