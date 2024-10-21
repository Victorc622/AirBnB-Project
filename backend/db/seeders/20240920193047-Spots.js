"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "5-6 Matsuyama",
          city: "Dogo Onsen",
          state: "Ehime",
          country: "Japan",
          lat: 52.895,
          lng: -123.569,
          name: "Aburaya Bathhouse",
          description: "A relaxing stay with a sauna and delicious food",
          price: 200,
          avgRating: 4.6,
          previewImage: "/Images/Bathhouse/BathhouseOutside.jpg",
        },
        {
          ownerId: 2,
          address: "Laputa",
          city: "The Slug Ravine",
          state: "Wales",
          country: "Wales",
          lat: 59.9328,
          lng: 153.6823,
          name: "Castle In The Sky",
          description:
            "A peaceful stay with a fantastic view and advanced technology to take care of all your vacation needs",
          price: 600,
          avgRating: 4.9,
          previewImage: "/Images/Castle/CastleInTheSky.jpg"
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      { ...options, tableName: "Spots" },
      {
        ownerId: { [Op.in]: [1, 2] },
      },
      {}
    );
  },
};