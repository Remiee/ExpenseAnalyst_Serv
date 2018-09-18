var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "wrong format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    getterMethods: {
      fullName: function () {
        return `${this.lastName} ${this.firstName}`;
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Expense, { foreignKey: 'userId' });
  };
  return User;
};