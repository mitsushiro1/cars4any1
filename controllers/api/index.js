const router = require('express').Router();

const userRoutes = require('./userRoutes');
const vehicleRoutes = require('./vehicleRoutes');
const postingRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
// const emailRoutes  = require('../../utils/email');

router.use('/users', userRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/postings', postingRoutes);
router.use('/comments', commentRoutes);
// router.use('/signup', emailRoutes);
module.exports = router;