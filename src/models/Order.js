const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED"
      ),
      defaultValue: "PENDING"
    }
  },
  {
    timestamps: true
  }
);

module.exports = Order;
