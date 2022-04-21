'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('role', [{
            idRole: 4,
            roleName: 'test',
            active: 1,
        },
        // {
        //     idRole: 2,
        //     roleName: 'doctor',
            // active: 1,

        // },
        // {
        //     idRole: 3,
        //     roleName: 'employee',
        // active: 1,
    
        // }
        ]);
    },


    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('product', null, {});
    }
}