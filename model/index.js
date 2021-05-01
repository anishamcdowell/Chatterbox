const User = require('./users');
const Forum = require('./forums');
const Post = require('./posts');


Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});


module.exports = { User, Forum, Post };
