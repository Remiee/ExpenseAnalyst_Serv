'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories',
      [ {
          name: 'Utility cost',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          name: 'Rent',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          name: 'Installment',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          name: 'Food',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          name: 'Sport',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          name: 'Entertainment',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          name: 'Other',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
