const router = require('express').Router();
const auth = require('./../utils/auth');
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
    const cars = await Vehicle.findAll();
    const carsArr = cars.map(car => car.get({plain: true}));
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      userid: req.session.userid,
      is_vendor: req.session.is_vendor,
      postArray,
      carsArr
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

router.get('/myposts/:id', auth, async (req, res) => {
  try {
    const response = await Posting.findAll({ 
    where: {user_id: req.params.id},
    });
    const posts = response.map(data => data.get({plain: true}));
    const commentResponse = await Comment.findAll({
      where: {user_id: req.params.id}
    });
    const comments = commentResponse.map(com => com.get({plain: true}));

    res.render('myposts', {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      userid: req.session.userid,
      posts,
      comments
    });
  } catch(e) {
    res.status(500).json(e);
  }
});

module.exports = router;