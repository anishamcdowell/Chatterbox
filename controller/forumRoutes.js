const withAuth = require('../utils/auth');
const sequelize = require("../config/connection");
const { User, Post, Comment } = require ("../models");
const router = require("express").Router();

//Get the selected forum and display all the posts in that forum
router.get("/:name", async (req, res) => {
    try {
        Forum.findOne({
            where: {
                name: req.params.name
            },
            attributes: [
                "id",
                "name",
                "description",
            ],
            include: [
                {
                    model: Post,
                    attributes: ["id", "username"]
                }
            ]
        })
    .then(forumData => {
        res.render("forum");
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

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/dashboard');
//     return;
//   }

//   res.render('login');
// });

// router.get('/signup', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/dashboard');
//     return;
//   }

//   res.render('signup');
// });

router.get('/create-post', (req, res) => {
  // If the user is already logged out, redirect the request to another route
  if (req.session.logged_out) {
    res.redirect('/signup');
    return;
  }

  res.render('create-post');
});

module.exports = router;