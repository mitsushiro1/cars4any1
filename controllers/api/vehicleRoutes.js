const router = require('express').Router();
const { User, Vehicle, Posting, Comment} = require('./../../models/index');

router.get('/', async (req, res) => {
  try {
    const response = await Vehicle.findAll({
      include: [{model: Posting}]
    });
    res.status(200).json(response);
  } catch(e) {
    res.status(500).json(e);
  }
});

router.get('/make/:make', async (req, res) => {
  try {
    const response = await Vehicle.findAll({
      where: {make: req.params.make}
    });
    res.status(200).json(response);
  } catch(e) {
    res.status(500).json(e);
}});

router.get('/model/:model', async (req, res) => {
  try {
    const response = await Vehicle.findAll({
      where: {make: req.params.model}
    });
    res.status(200).json(response);
  } catch(e) {
    res.status(500).json(e);
}});

router.get('/year/:year', async (req, res) => {
  try {
    const response = await Vehicle.findAll({
      where: {year: parseInt(req.params.year)}
    });
    res.status(200).json(response);
  } catch(e) {
    res.status(500).json(e);
}});

module.exports = router;