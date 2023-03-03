const router = require('express').Router();
const { Comment } = require('../../models/index');

router.get('/', async (req,res) => {
  try {
    if (req.query.key === process.env.APIKEY) {
      const response = await Comment.findAll();
      res.status(200).json(response);
    } else {
      res.status(400).json({
        message: 'You need api key to get users data'
      })
    }
  }
  catch(e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (req.query.key === process.env.APIKEY) {
      const response = await Comment.findByPk(req.params.id);
      res.status(200).json(response);
    } else {
      res.status(400).json({
        message: 'You need api key to get users data'
      })
    }
  } 
  catch(e) {
    res.status(500).json(e);
  }
});

router.post('/', (req,res) => {
  Comment.create(req.body)
  .then((data) => {
    res.status(200).json(data);
  })
});

router.put('/:id', async (req, res) => {
  try {
    const id = await Comment.update(
      {
        comment: req.body.comment
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(id);
  } catch (err) {
    res.status(404).json({ message: 'No comments found with this id!'});
  }
});

router.delete('/:id', async (req, res) => {
  
  try {
    const commData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: 'No comments found with this id!'});
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;