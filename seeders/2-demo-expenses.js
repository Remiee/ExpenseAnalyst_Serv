'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Expenses',
      [ {
          userId: '1',
          category: 'Utility cost',
          amount: '2000',
          comment: 'electricity',
          spentAt: '2018.01.01',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          userId: '2',
          category: 'Utility cost',
          amount: '4000',
          comment: 'gas',
          spentAt: '2018.01.01',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          userId: '2',
          category: 'Utility cost',
          amount: '5000',
          comment: 'water',
          spentAt: '2018.01.01',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          userId: '1',
          category: 'Sport',
          amount: '1000',
          comment: 'gym membership',
          spentAt: '2018.01.01',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          userId: '1',
          category: 'Food',
          amount: '2000',
          comment: '',
          spentAt: '2018.01.01',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          userId: '2',
          category: 'Food',
          amount: '4000',
          comment: '',
          spentAt: '2018.01.01',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          userId: '2',
          category: 'Entertainment',
          amount: '5000',
          comment: 'party',
          spentAt: '2018.01.01',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }, {
          userId: '1',
          category: 'Other',
          amount: '1000',
          comment: '',
          spentAt: '2018.01.01',
          createdAt: '2018.01.01',
          updatedAt: '2018.01.01'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Expenses', null, {});
  }
};
