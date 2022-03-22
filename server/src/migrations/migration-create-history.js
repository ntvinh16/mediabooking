'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('History', {
      idHistory: {
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
      date: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      idPatient: {
        type: Sequelize.INTEGER,
        references: { model: 'History', key: 'idPatient' }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('History');
  }
};