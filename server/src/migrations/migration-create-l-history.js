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
        references: { model: 'Booking', key: 'idBooking' }
      },
      idTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'examination_hours', key: 'idTime' }
      },
      date: {
        type: Sequelize.STRING
      },
      idStaff: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'doctor_info', key: 'idStaff' }
      },
      idPatient: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'patient', key: 'idPatient' }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('History');
  }
};