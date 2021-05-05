  const { User } = require('../models');

const UserData = [
    {
        username: 'User 1',
        email: 'user1@test.com',
        password: "testtest"
    },
    {
        username: 'User 2',
        email: 'user2@test.com',
        password: "testtest"
    },
    {
        username: 'User 3',
        email: 'user3@test.com',
        password: "testtest"
    }
];

const seedUsers = () => User.bulkCreate(UserData);

module.exports = seedUsers;