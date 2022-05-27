const sequelize = require("../config/connection");
const { User } = require("../models");
const { Blogs } = require("../models");
const { Comments } = require("../models");

const userData = require("./userData.json");
const blogsData = require("./blogsData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Blogs.bulkCreate(blogsData, {
    individualHooks: true,
    returning: true,
  });

  await Comments.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
