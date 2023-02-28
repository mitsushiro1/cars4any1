const router = require('express').Router();
const apiRouter = require('./api/index.js');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRouter);


module.exports = router;