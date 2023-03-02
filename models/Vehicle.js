const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vehicle  extends Model {};

Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
    make: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_luxury: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    body_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fuel_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seating_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5
    },
    is_automatic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,

    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'vehicle'
  }
);

module.exports = Vehicle;