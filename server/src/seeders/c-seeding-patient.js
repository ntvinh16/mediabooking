'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('role', [{
            idRole: 1,
            roleName: 'admin',
            active: 1,
        },
        {
            idRole: 2,
            roleName: 'doctor'
        },
        {
            idRole: 3,
            roleName: 'employee'
        }
        ]);
    },


    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('product', null, {});
    }
}