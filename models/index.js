const User = require("./users");
const Post = require("./posts");
// const Comment = require("./comments");

// Post.belongsTo(User, {
//     foreignKey: 'user_id',
//     onDelete: "CASCADE"
// });

module.exports = { User, Post };