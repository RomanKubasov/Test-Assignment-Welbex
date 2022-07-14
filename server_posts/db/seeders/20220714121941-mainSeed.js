module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('posts', [
      {
        user_id: 1, login: 'ADMIN', post: 'This is the 1st post', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 2, login: 'USER', post: 'This is the 2nd post', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 2, login: 'USER', post: 'This is the 3rd post', createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
  },
};
