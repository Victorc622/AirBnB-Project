'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoReviewImages = [
  { reviewId: 1, images: [
      { url: "review1_image1.png" },
      { url: "review1_image2.png" }
  ]},
  { reviewId: 2, images: [
      { url: "review2_image1.png" },
      { url: "review2_image2.png" },
      { url: "review2_image3.png" }
  ]},
  
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    for (const reviewImage of demoReviewImages) {
      for (const image of reviewImage.images) {
        ReviewImage.create({
          reviewId: reviewImage.reviewId,
          url: image.url,
          preview: image.preview || false
        });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (const reviewImage of demoReviewImages) {
      for (const image of reviewImage.images) {
        ReviewImage.destroy({
          where: {
            reviewId: reviewImage.reviewId,
          }
        });
      }
    }
  }
};
