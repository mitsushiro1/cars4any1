const router = require('express').Router();
const { User, Vehicle, Posting, Comment} = require('./../../models/index');
const { sendWelcomeEmail } = require('./email');

router.get('/', async (req, res) => {
  try {
    const postingData = await Posting.findAll({ 
      include: [
        {model: Vehicle},
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email",
            "user_city"
          ]
        },
        {
          model: Comment
        }
      ]
    });

    res.status(200).json(postingData);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const postingData = await Posting.findAll({
      where: {user_id: req.params.id}
    });

    res.status(200).json(postingData);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postingData = await Posting.findByPk(req.params.id, { 
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
        }, {
          model: Comment
        }
      ]});

    res.status(200).json(postingData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const postData = await Posting.create(req.body);
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;

router.put('/:id', async (req, res) => {
  // update a post by its `id` value
  try {
    const postData = await Post.update(req.body,{
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Posting.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const {title, content} = req.body;
    const post = await Posting.findByPk(req.params.id);
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.json(post);
  } catch(e) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


