'use strict';
module.exports = (sequelize, DataTypes) => {
  var Expense = sequelize.define('Expense', {
    userId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    spentAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Expense.associate = function(models) {
    Expense.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Expense;
};