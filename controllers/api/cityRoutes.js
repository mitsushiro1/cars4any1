const router = require('express').Router();
const { User, City, Vehicle, Posting, Comment} = require('./../../models/index');

router.get('/', async (req, res) => {
  try {
    if (req.query.key === process.env.APIKEY) {
      const response = await City.findAll();
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

router.get('/:id', async(req, res) => {
  try {
    if (req.query.key === process.env.APIKEY) {
      const response = await City.findByPk(req.params.id);
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
    if (req.query.key === process.env.APIKEY) {
      const response = await City.update(req.body, {where: {id: req.params.id}});
    res.status(200).json(response);
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
    const newCity = Object.assign({}, req.body);
    const response = await City.create(newCity);
    res.status(200).json({
    status: 'success',
    data: response
  });
  } catch(e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (req.query.key === process.env.APIKEY) {
      const response = await City.destroy({where: {
        id: req.params.id
      }});
      res.status(200).json({
        status: 'success',
        response
      });
    } else {
      res.status(400).json({
        message: 'You need an api key to delete users!'
      })
    }
  } catch(e) {
    res.status(500).json(e);
  }
});

module.exports = router;