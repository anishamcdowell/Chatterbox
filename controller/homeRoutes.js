const withAuth = require('../utils/auth');
const sequelize = require("../config/connection");
const { User, Post, Forum, Comment } = require ("../models");
const router = require("express").Router();

//Get all posts and display as the homepage of the app
router.get("/", async (req, res) => {
    try {
        Post.findAll({
            attributes: [
                "title",
                "content",
                "user_id"
            ]
        })
        .then(postData => {
          
            const posts = postData.map(post => post.get({ plain: true}));
            console.log("here", posts);
            res.render("homepage", {posts, logged_in: req.session.logged_in});
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  console.log(req.session)
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

router.get('/create-post', (req, res) => {
  // If the user is already logged out, redirect the request to another route
  if (req.session.logged_out) {
    res.redirect('/signup');
    return;
  }

  res.render('create-post');
});

module.exports = router;