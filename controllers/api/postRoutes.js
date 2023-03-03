const router = require('express').Router();
const { User, Vehicle, Posting, Comment} = require('./../../models/index');


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
            "email"
          ]
        }
      ],
      attributes: [
        "id",
        "title"
      ]
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
    const postData = await Post.create(req.body);
    console.log(req.body);
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
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


