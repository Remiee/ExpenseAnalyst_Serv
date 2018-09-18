'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        require: true
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        require: true
      },
      email: {
        type: Sequelize.STRING,
        require: true,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        require: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};