'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert('roles', [{
            name: "admin",
            description: 'some description for admin',
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now())
        }, {
            name: "author",
            description: 'some description for author',
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now())
        }], {})


    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('roles', null, {})

    }
};