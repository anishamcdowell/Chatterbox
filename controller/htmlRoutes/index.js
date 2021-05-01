const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
// const forumRoutes = require('./forumRoutes');
// const postRoutes = require('./postRoutes');
// const commentRoutes = require('./commentRoutes');

router.use('/', homeRoutes);
// router.use('/forums', forumRoutes);
// router.use('/posts', postRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;