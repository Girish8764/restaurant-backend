const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Food = sequelize.define(
  "Food",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    imageUrl: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true
  }
);

module.exports = Food;
