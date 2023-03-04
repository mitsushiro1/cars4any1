const router = require('express').Router();
const { User, Vehicle, Posting, Comment} = require('./../../models/index');

router.get('/', async (req,res) => {
  try {
      const response = await Comment.findAll({
        include: [{model: User}]
      });
      res.status(200).json(response);
    } 
    catch(e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
      const response = await Comment.findByPk(req.params.id);
      res.status(200).json(response);
  } 
  catch(e) {
    res.status(500).json(e);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
      const response = await Comment.findAll({
        where: {user_id: req.params.id}
      });
      res.status(200).json(response);
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
    res.status(404).json({ message: 'No comments found with This id!'});
  }
});

router.delete('/:id', async (req, res) => {
  
  try {
    const response = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.patch('/:id', async (req, res) => {
  try {
    const {comment} = req.body;
    const post = await Comment.findByPk(req.params.id);
    if (comment) post.comment = comment;
    await post.save();
    res.json(post);
  } catch(e) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;