  const { Comment } = require('../models');

const commentData = [{
        comment_text: "This is comment one from user 1",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "This is comment two from user 2",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "This is comment 3 from user 3",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;