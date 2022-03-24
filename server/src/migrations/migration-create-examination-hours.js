'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Examination_Hours', {
      idTime: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idStaff: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'doctor_info', key: 'idStaff' }
      },
      slotTime: {
        type: Sequelize.STRING
      },
      currentDate: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Examination_Hours');
  }
};