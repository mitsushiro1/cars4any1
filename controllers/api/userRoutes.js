const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, City, Vehicle, Posting, Comment} = require('./../../models/index');

router.post('/', async (req, res) => {
  try {
    const newUser = Object.assign({}, req.body);
    newUser.password = await bcrypt.hash(req.body.password, 10);
    const response = await User.create(newUser);
    res.status(200).json(response);
  } catch(e) {
    res.status(400).json(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    const user = await userData.get({plain: true});
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = user.first_name;
      req.session.userid = user.id;
      req.session.is_vendor = user.is_vendor;
      res
        .status(200)
        .json({ user: user, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;