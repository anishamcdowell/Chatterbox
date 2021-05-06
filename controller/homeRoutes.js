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
            res.render("homepage", {posts});
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// const router = require('express').Router();
// const sequelize = require("../config/connection");
// const { Post, User } = require('../models');

// router.get('/', async (req, res) => {
//   try {
//     // Get all posts and JOIN with user data
//     await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const posts = postData.map((post) => post.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       posts, 
//       // logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/post/:id', async (req, res) => {
//   try {
//     const Data = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const post = postData.get({ plain: true });

//     res.render('post', {
//       ...post,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
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