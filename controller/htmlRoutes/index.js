const router = require('express').Router();
const homeRoutes = require('./api/homeRoutes');
// const forumRoutes = require('./api/forumRoutes');
// const postRoutes = require('./api/postRoutes');
// const commentRoutes = require('./api/commentRoutes');

router.use('/', homeRoutes);
// router.use('/forums', forumRoutes);
// router.use('/posts', postRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;