const User = require("./users");
const Post = require("./posts");
const Comment = require("./comments");
// const Forum = require("./forums");

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',

});

User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

//TODO: FORUM ASSOCIATIONS
//Forum.hasMany(Post)
//Post.belongsTo(Forum)

module.exports = { User, Post, Comment };