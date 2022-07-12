const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('roles', [
       {role: 'admin', createdAt: new Date(), updatedAt: new Date()},
       {role: 'user', createdAt: new Date(), updatedAt: new Date()},
     ]);
     await queryInterface.bulkInsert('users', [
      {login: 'ADMIN', pass: await bcrypt.hash('123',10), role_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {login: 'USER', pass: await bcrypt.hash('123',10), role_id: 2, createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
  }
};
