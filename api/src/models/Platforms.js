const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('platform', {
    name: {
        unique: true,
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    }

  },{ timestamps: false, freezeTableName: true });
};