'use strict';
const { now } = require('jquery');
const { hashPassword } = require('./../helpers/helper')
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
        let i = 0;
        while (i < 10) {
            let string = Math.random().toString(36).substr(5)
            await queryInterface.bulkInsert('users', [{
                firstName: string,
                lastName: string,
                email: string,
                password: hashPassword('mypassword'),
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now())
            }], {})

            ++i;
        }

    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users', null, {});

    }
};