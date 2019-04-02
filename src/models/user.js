'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      fullname: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Laporan, {
      foreignKey: 'userId',
      as: 'laporan'
      // constraints: false
    });
  };
  return User;
};
