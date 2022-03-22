'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctor_info', {
      // idDoctor: {
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   autoIncrement: true,
      // },
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
      image: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      contentHTML: {
        type: Sequelize.TEXT,
      },
      contentMarkdown: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctor_info');
  }
};