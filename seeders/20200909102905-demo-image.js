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
        let string = Math.random().toString(36).substr(5)
        await queryInterface.bulkInsert('images', [{
            userId: Math.round(Math.random() * 10),
            title: string,
            src: 'https://freepngimg.com/thumb/selena_gomez/8-2-selena-gomez-png.png',
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
        await queryInterface.bulkDelete('images', null, {})
    }
};