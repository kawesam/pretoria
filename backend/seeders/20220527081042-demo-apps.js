'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Apps', [{
        name: 'Pretia Technologies',
        description: 'Pretia is a development platform for AR developers. Pretia platform provides people with markerless spatial understanding technology and easy-to-use multiplayer services.',
        createdAt:new Date(),
        updatedAt:new Date()
         },
        {
          name: 'Augmented reality',
          description: 'AR an interactive experience of a real-world environment where the objects that reside in the real world are enhanced by computer-generated perceptual information',
          createdAt:new Date(),
          updatedAt:new Date()
        },{
          name: ' Virtual Reality',
          description: 'VR bridges the digital and physical worlds. They allow you to take in information and content visually, in the same way you take in the world.',
          createdAt:new Date(),
          updatedAt:new Date()
        },{
          name: ' AR puzzle game',
          description: 'A Challenge from a cofee shop” made by Pretia × Shogakukan!',
          createdAt:new Date(),
          updatedAt:new Date()
        },{
          name: ' Pretia',
          description: 'Pretia is a start-up company that plans, develops and operates AR Cloud and various AR services with the mission of "Empower collaborative achievement',
          createdAt:new Date(),
          updatedAt:new Date()
        },{
          name: ' Node Js',
          description: 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.',
          createdAt:new Date(),
          updatedAt:new Date()
        },{
          name: ' Express Js',
          description: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
          createdAt:new Date(),
          updatedAt:new Date()
        },{
          name: ' JWT Authentication',
          description: 'JWT is a JSON encoded representation of a claim(s) that can be transferred between two parties. The claim is digitally signed by the issuer of the token.',
          createdAt:new Date(),
          updatedAt:new Date()
        },{
          name: ' Migrations',
          description: 'A migration file contains code to apply the changes, and code to remove the changes again.',
          createdAt:new Date(),
          updatedAt:new Date()
        },{
          name: ' Database seeding',
          description: 'Seeding a database is a process in which an initial set of data is provided to a database when it is being installed.',
          createdAt:new Date(),
          updatedAt:new Date()
        }
     ], {});
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Apps', null, {});

  }
};
