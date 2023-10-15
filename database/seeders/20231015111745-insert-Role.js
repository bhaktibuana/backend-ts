"use strict";

/** @type {import('sequelize-cli').Migration} */
const moment = require("moment");
const dateNow = moment().toDate();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Role",
      [
        {
          code: "SA",
          name: "Super Admin",
          createdAt: dateNow,
          createdBy: "Bulk Insert",
          updatedBy: dateNow,
          updatedBy: "Bulk Insert",
        },
        {
          code: "RU",
          name: "Regular User",
          createdAt: dateNow,
          createdBy: "Bulk Insert",
          updatedBy: dateNow,
          updatedBy: "Bulk Insert",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Role", null, {});
  },
};
