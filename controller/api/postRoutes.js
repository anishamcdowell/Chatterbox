// /api/posts

const { User, Post, Comment } = require("../../models")
const router = require("express").Router();
const withAuth = require('../../utils/auth');

//Get all posts
router.get("/", async (req, res) => {
    try {
        Post.findAll({
            attributes: [
                "id",
                "user_id",
                "content",
                "created_at"
            ],
            order: ['created_at', 'ASC'],
            include: [
              {
                model: User,
                attributes: ['username']
              }
            ]
        })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true}));
            res.render("dashboard", {posts, loggedIn: req.session.loggedIn});
            // console.log(postData);
            // const posts = postData.map(post => post.get({ plain: true}));
            // res.json(postData);
            // res.render("homepage", {allPost: postData});
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get a single post and display its associated comments - requires auth
router.get("/post/:id", async (req, res) => {
    try {
        Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                "id",
                "user_id",
                "content",
                "created_at"
            ],
            include: [
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                }
            ]
        })
    .then(postData => {
        res.render("display-post", postData[req.params.num - 1]);
    });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// //Make a post
router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// //Update a post
// router.put(
//     //Post.update()
// );

// //Delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;