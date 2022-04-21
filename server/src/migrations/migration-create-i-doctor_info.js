'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctor_info', {
      idStaff: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Staff', key: 'idStaff' },
        primaryKey: true,
      },
      idSpecialist: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Specialist', key: 'idSpecialist' }
      },
      contentHTML: {
        type: Sequelize.TEXT,
      },
      contentMarkdown: {
        type: Sequelize.TEXT,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctor_info');
  }
};