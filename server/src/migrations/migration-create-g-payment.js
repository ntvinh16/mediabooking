'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payment', {
      idPayment: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      methodName: {
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payment');
  }
};