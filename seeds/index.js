const seedUsers = require('./user-seed');
// const seedForums = require("./forum-seeds");
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    console.log("== DB SYNCED ==");

    await seedUsers();
    console.log("== USER TABLE SEEDED ==");

    // await seedForums();
    // console.log("== FORUM TABLE SEEDED ==");

    await seedPosts();
    console.log("== POSTS TABLE SEEDED ==");

    await seedComments();
    console.log("== COMMENTS TABLE SEEDED ==");


    process.exit(0);
};

seedAll();