'use strict';

const { Review } = require('../models');
const review = require('../models/review');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          "userId": 1,
          "spotId": 2,
          "review": "I had the most relaxing time in the hotsprings while eating the most delicious food!",
          "stars": 5,
        },
        {
          "userId": 2,
          "spotId": 1,
          "review": "This place combined nature with advanced technology to give me the best experience possible!",
          "stars": 5,
        }

      ], 
      { validate: true }
    )
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        review: {
          [Op.in]: [
            "I had the most relaxing time in the hotsprings while eating the most delicious food!",
            "This place combined nature with advanced technology to give me the best experience possible!",
          ]
        }   
      }
    )
    
  }
};
