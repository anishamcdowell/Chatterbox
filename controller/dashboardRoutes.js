const withAuth = require('../utils/auth');
const sequelize = require("../config/connection");
const { User, Post } = require ("../models");
const router = require("express").Router();

//Get all posts and display as the homepage of the app
router.get("/", async (req, res) => {
  console.log('HERE')
    try {
        const postData = Post.findAll({
          where: {
            //user id is eqal to id of the current user session
            user_id: req.session.user_id,
          },
             attributes: [
                username: '',
                content: '',
                created_at: '',
            ]
        });

        const post = (await postData).map(post => post.get({plain: true }))
        ; 

        console.log('POSTS', posts);
      }

        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true}));
            res.render("dashboard", {posts});
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// // Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
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

  // router.get("/", (req, res) => {
//     User.findAll({
//         attributes: {exclude: ["[password]"] }
//     })
//     .then(userData => res.json(userData))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });
  
module.exports = router;
  