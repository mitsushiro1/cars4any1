const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Vehicle, Posting, Comment} = require('./../../models/index');
const { sendWelcomeEmail } = require('./email.js');
router.get('/', async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch(e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (req.query.key === process.env.APIKEY) {
      const response = await User.findByPk(req.params.id);
      res.status(200).json(response);
    } else {
      res.status(400).json({
        message: 'You need api key to get users data'
      })
    }
    
  } catch(e) {
    res.status(500).json(e);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const response = await User.update(req.body, {where: {id: req.params.id}});
    res.status(200).json(response);
  } catch(e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (req.query.key === process.env.APIKEY) {
      const response = await User.destroy({where: {
        id: req.params.id
      }});
      res.status(200).json({
        status: 'success',
        response
      });
    } else {
      res.status(400).json({
        message: 'You need an api key to delete users!'
      });
    }
  } catch(e) {
    res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = Object.assign({}, req.body);
    newUser.password = await bcrypt.hash(req.body.password, 10);
    const response = await User.create(newUser);

    await sendWelcomeEmail(newUser.email);

    res.status(200).json(response);
  } catch(e) {
    console.log(e);
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
      req.session.lastname = user.last_name;
      req.session.userid = user.id;
      req.session.email = user.email;
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

router.patch('/:id', async (req, res) => {
  try {
    const { first_name, last_name, email, password, is_vendor, user_city } = req.body;

    const user = await User.findByPk(req.params.id);
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;
    if (is_vendor !== undefined) user.is_vendor = is_vendor;
    if (user_city) user.user_city = user_city;
    await user.save();

    // return the updated user
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;





