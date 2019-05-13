'use strict';
module.exports = (sequelize, DataTypes) => {
  const Laporan = sequelize.define(
    'Laporan',
    {
      description: { type: DataTypes.STRING },
      longitude: { type: DataTypes.STRING, allowNull: false },
      latitude: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      district: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Laporan.associate = function(models) {
    // associations can be defined here
    Laporan.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      allowNull: false,
      as: 'user'
      // constraints: false
    });
  };
  return Laporan;
};
