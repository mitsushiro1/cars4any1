const router = require('express').Router();
const { Posting } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const postingData = await Posting.findAll({
      include: [
        {
          model: Posting,
          attributes: ['title'],
        },
      ],
    });

    const galleries = postingData.map((posting) =>
      posting.get({ plain: true })
    );

    res.render('homepage', {
      galleries,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one posting
router.get('/posting/:id', async (req, res) => {
  try {
    const postingData = await posting.findByPk(req.params.id, {
      include: [
        {
          model: Posting,
          attributes: [
            'id',
            'title',
          ],
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


module.exports = router;
