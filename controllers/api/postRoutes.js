const router = require('express').Router();
const { User, Vehicle, Posting, Comment} = require('./../../models/index');


router.get('/', async (req, res) => {
  try {
    const postingData = await Posting.findAll({ 
      include: [
        Vehicle,
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


    /*
      {
        id: 1,
        title: "My Post",
        vehicle: {
          id:
          make:
          model:
          ...
        },
        user: {
          id: 
          first_name:
          last_name:
          emaiL:
        }
      }


    */

    res.status(200).json(postingData);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get('/posting/:id', async (req, res) => {
  try {
    const postingData = await Posting.findByPk(req.params.id, {
      include: [
        { 
          model: Vehicle,
          model: User,
          model: Comment,
        },
      ],
    });

    const posting = postingData.get({ plain: true });
    res.render('post', { posting });
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


