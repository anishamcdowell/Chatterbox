const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const forumRoutes = require('./forumRoutes');
const postRoutes = require("./postRoutes");
const commentRoutes = require('./commentRoutes');
const { User, Post } = require('../../models');

router.use('/users', userRoutes);
// router.use('/forums', forumRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
