'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      await queryInterface.bulkInsert('images', [{
        userId: Math.round(Math.random()*10),
        title: string,
        src:'https://freepngimg.com/thumb/selena_gomez/8-2-selena-gomez-png.png',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }], {})

      ++i;
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('images',null,{})
  }
};
