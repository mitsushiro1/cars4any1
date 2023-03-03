const router = require('express').Router();
const { User, Vehicle, Posting, Comment} = require('./../models/index');

router.get('/', async (req, res) => {
  try {
    const response = await Posting.findAll({ 
      include: [
        {model: Vehicle},
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email"
          ]
        }
      ],
      attributes: [
        "id",
        "title"
      ]
    });

    const postArray = response.map(p => p.get({plain: true}));

    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      userid: req.session.userid,
      is_vendor: req.session.is_vendor,
      postArray
    });
  } catch(e) {
    res.status(500).json(e);
  }
});

router.get('/profile', async (req, res) => {
  try {

    res.render('profile', {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      lastname: req.session.lastname,
      email: req.session.email,
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