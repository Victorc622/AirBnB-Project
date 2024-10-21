"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "/Images/Bathhouse/BathhouseOutside.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "Images/Bathhouse/BathHouseReview.png",
          preview: false,
        },
        {
          spotId: 2,
          url: "/Images/Castle/CastleInTheSky.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "/Images/Castle/CastleInTheSkyReview.jpeg"
        }

      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "/Images/Bathhouse/BathhouseOutside.jpg",
            "/Images/Castle/CastleInTheSky.jpg",
          ],
        },
      },
      {}
    );
  },
};
