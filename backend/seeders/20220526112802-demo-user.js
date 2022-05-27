'use strict';
var bcrypt = require('bcryptjs');


module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [{
       userName: 'Samuel',
       password: bcrypt.hashSync('password'),
       createdAt:new Date(),
       updatedAt:new Date()

      },{
        userName: 'John Doe',
        password: bcrypt.hashSync('password'),
        createdAt:new Date(),
        updatedAt:new Date()
      },
        {
          userName: 'Pretia',
          password: bcrypt.hashSync('password'),
          createdAt:new Date(),
          updatedAt:new Date()
        }
      ], {});

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Users', null, {});

  }
};
