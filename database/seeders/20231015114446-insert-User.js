"use strict";

/** @type {import('sequelize-cli').Migration} */
const moment = require("moment");
const { models } = require("../../dist/models");
const dateNow = moment().toDate();

module.exports = {
  async up(queryInterface, Sequelize) {
    const roleData = await models.Role.findOne({
      where: { code: "SA" },
    });

    await queryInterface.bulkInsert(
      "User",
      [
        {
          name: "Super Admin",
          email: "superadmin@example.com",
          roleId: roleData.id,
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
    await queryInterface.bulkDelete("User", null, {});
  },
};
