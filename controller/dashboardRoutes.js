// /dashboard routes

const withAuth = require('../utils/auth');
const sequelize = require("../config/connection");
const { User, Post, Comment } = require ("../models");
const router = require("express").Router();

// If user is logged in, display dashboard with user's posts and ability to make post
//Get all user posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        //user id is equal to id of the current user session
        user_id: req.session.user_id,
      }
    });

    const posts = postData.map(post => post.get({ plain: true }));

    res.render('dashboard', { posts, logged_in: req.session.logged_in});
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//Create new post - post to api for postRoutes??

  
module.exports = router;
  