const router = require('express').Router();
const { User, Vehicle, Posting, Comment} = require('./../models/index');

router.get('/', async (req, res) => {
  try {

    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      userid: req.session.userid,
      is_vendor: req.session.is_vendor
    });
  } catch(e) {
    res.status(500).json(e);
  }
});

router.get('/login', (req, res) => {
  try {
    res.render('login');
  } catch(e) {
    res.status(500).json(e);
  }
});

router.get('/signup', (req, res) => {
  try {
    res.render('signup');
  } catch(e) {
    res.status(500).json(e);
  }
});

module.exports = router;