const withAuth = require('../utils/auth');
const sequelize = require("../config/connection");
const { User, Post, Comment } = require ("../models");
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
            
            if (req.session.logged_in) {
              res.render("dashboard", {posts, logged_in: req.session.logged_in});
            } else {
              res.render("homepage", {posts, logged_in: req.session.logged_out});
            };

        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.get('/login', (req, res) => {
  console.log(req.session)
  // If the user is already logged in, redirect the request to their dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard', {logged_in: req.session.logged_in});
    return;
  }

  res.render('login');
});

// Logout
router.get('/logout', (req, res) => {
  console.log(req.session)
  // If the user is already logged in, redirect the request to their dashboard
  if (req.session.logged_in) {
    res.redirect('/', {logged_in: req.session.logged_in});
    return;
  }

  res.render('homepage');
});

// Signup 
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

//Create a post
router.get('/create-post', (req, res) => {
  // If the user is logged out, redirect the request to the login
  if (req.session.logged_out) {
    res.redirect('/login');
    return;
  }

  res.render('create-post', {logged_in: req.session.logged_in});
});

// View your own user profile if you are logged in
router.get('/profile', (req, res) => {

  if (req.session.logged_out) {
    res.redirect('/login');
    return;
  }
  res.render('profile', {logged_in: req.session.logged_in});
});

// View settings for logged in account
router.get('/settings', (req, res) => {

  if (req.session.logged_out) {
    res.redirect('/login');
    return;
  }
  res.render('settings', {logged_in: req.session.logged_in});
});

// View help/support page for users
router.get('/help', (req, res) => {

  if (req.session.logged_out) {
    res.redirect('/login');
    return;
  }
  res.render('help', {logged_in: req.session.logged_in});
});

module.exports = router;
