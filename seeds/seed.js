const sequelize = require('../config/connection');
const { User, Vehicle, Posting, Comment} = require('../models');

const usersData = require('./usersData.json');
const carsData = require('./carsData.json');
const commentsData = require('./commentsData.json');
const postingsData = require('./postingsData.json');


async function seedAll() {
  await Vehicle.bulkCreate(carsData);
  await User.bulkCreate(usersData);
  await Posting.bulkCreate(postingsData);
  await Comment.bulkCreate(commentsData);
  process.exit(1);
}

seedAll();

