const express = require('express');
const helmet = require('helmet');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

const UsersRouter = require('../users/users-router');
const AuthRouter = require('../auth/auth-router');
const knex = require('../data/dbConfig');

const server = express();

const sessionConfig = {
  name: 'christmasCookies',
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,

  store: new KnexSessionStore({
    knex,
    createtable: true,
    clearInterval: 1000 * 60 * 10,
    sidfieldname: 'sid',
    tablename: 'sessions'
  }),

  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true
  }
};

server.use(helmet());
server.use(express.json());
server.use(sessions(sessionConfig));

server.use('/users', UsersRouter);
server.use('/auth', AuthRouter);

server.use('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
