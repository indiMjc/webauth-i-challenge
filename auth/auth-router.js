const bcrypt = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 6);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Internal error while registering user.' });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  // prettier-ignore
  Users.findBy({ username })
    .first()
    .then(user => {
      user && bcrypt.compareSync(password, user.password)
        ? req.session.username = user.username &&
            res.status(200).json({ message: `Welcome, ${user.username}!` })
        : res.status(401).json({ message: 'You shall not pass!' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error while logging in.' });
    });
});

module.exports = router;
