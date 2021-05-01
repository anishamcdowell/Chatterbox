  
const { Post } = require('../model');

const postData = [{
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user_id: 1
    },
    {
        title: 'Post 2',
        content: 'Amet aliquam id diam maecenas ultricies mi eget mauris pharetra.',
        user_id: 2
    },
    {
        title: 'Post 3',
        content: 'Ut etiam sit amet nisl purus in mollis.',
        user_id: 3
    }
];

const seedPosts = () => {
    console.log("====POST DATA SEEDED====");
    return Post.bulkCreate(postData);
}
module.exports = seedPosts;