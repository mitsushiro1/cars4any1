const router = require('express').Router();
const userRoutes = require('./userRoutes');
const vehicleRoutes = require('./vehicleRoutes');
const postingRoutes = require('./postRoutes');


router.use('/users', userRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/postings', postingRoutes);

module.exports = router;