const router = require('express').Router();
const userRoutes = require('./userRoutes');
const forumRoutes = require('./forumRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/forums', forumRoutes);
router.use('/posts', postRoutes);

module.exports = router;