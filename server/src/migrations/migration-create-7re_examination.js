'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Re_Examination', {
        idRe_examination: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idBooking: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Booking', key: 'idBooking' },
      },
      idTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Examination_Hours', key: 'idTime' },
      },
      date: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      active: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Re_Examination');
  }
};