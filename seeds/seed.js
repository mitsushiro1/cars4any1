const sequelize = require('../config/connection');
const { User, City, Vehicle, Posting, Comment} = require('../models');

const usersData = require('./usersData.json');
const carsData = require('./carsData.json');
const citiesData = require('./citiesData.json');
const commentsData = require('./commentsData.json');
const postingsData = require('./postingsData.json');


function seedAll() {
  User.bulkCreate(usersData);
  Vehicle.bulkCreate(carsData);
  City.bulkCreate(citiesData);
  Posting.bulkCreate(postingsData);
  Comment.bulkCreate(commentsData);
}

seedAll();
