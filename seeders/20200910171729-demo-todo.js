'use strict';
const { now } = require('jquery');
const { randomString } = require('./../helpers/strings')
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
        await queryInterface.bulkInsert('todos', [{
                title: randomString('sm'),
                description: randomString('lg'),
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now())
            },
            {
                title: randomString('sm'),
                description: randomString('lg'),
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now())
            }, {
                title: randomString('sm'),
                description: randomString('lg'),
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now())
            },
            {
                title: randomString('sm'),
                description: randomString('lg'),
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now())
            }, {
                title: randomString('sm'),
                description: randomString('lg'),
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now())
            }, {
                title: randomString('sm'),
                description: randomString('lg'),
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now())
            }
        ], {})


    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('todos', null, {});

    }
};