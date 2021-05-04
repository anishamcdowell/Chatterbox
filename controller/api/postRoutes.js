// const sequelize = require("../../config/connection");
const { User, Post } = require("../../models")
const router = require("express").Router();

//Get all posts
router.get("/", async (req, res) => {
    try {
        Post.findAll({
            attributes: [
                "id",
                "user_id",
                "post_body",
                "created_at"
            ]
        })
        .then(postData => {
            // const posts = postData.map(post => post.get({ plain: true}));
            res.json(postData);
            res.render("homepage", {allPost: postData});
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//TODO: Get a single post and display its associated comments - requires auth
router.get("/post/:id", async (req, res) => {
    try {
        Post.findOne({
            attributes: [
                "id",
                "user_id",
                "post_body",
                "created_at"
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
// router.post(
//     //Post.create()
// );

// //Update a post
// router.put(
//     //Post.update()
// );

// //Delete a post
// router.delete(
//     //Post.destroy()
// );

module.exports = router;