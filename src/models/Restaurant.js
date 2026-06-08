const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Restaurant = sequelize.define(
  "Restaurant",
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
      type: DataTypes.TEXT,
      allowNull: false
    },

    cuisine: {
      type: DataTypes.STRING,
      allowNull: false
    },

    imageUrl: {
      type: DataTypes.STRING
    },

    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = Restaurant;
