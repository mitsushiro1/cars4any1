const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posting extends Model {};

Posting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'vehicle',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    posting_city_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'city',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'posting'
  }
);

module.exports = Posting;