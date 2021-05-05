const { Forum } = require('../models');

const forumData = [{
        name: 'Forum 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        name: 'Forum 2',
        description: 'Amet aliquam id diam maecenas ultricies mi eget mauris pharetra.',
    },
    {
        name: 'Forum 3',
        description: 'Ut etiam sit amet nisl purus in mollis.',
    }
];

const seedForums = () => Forum.bulkCreate(forumData);

module.exports = seedForums;