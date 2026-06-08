const User = require("./User");
const Restaurant = require("./Restaurant");
const Food = require("./Food");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

/* Restaurant -> Food */

Restaurant.hasMany(Food, {
    foreignKey: "restaurantId",
    onDelete: "CASCADE"
});

Food.belongsTo(Restaurant, {
    foreignKey: "restaurantId"
});

/* User -> Order */

User.hasMany(Order, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Order.belongsTo(User, {
    foreignKey: "userId"
});

/* Order -> OrderItem */

Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    onDelete: "CASCADE"
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId"
});

/* Food -> OrderItem */

Food.hasMany(OrderItem, {
    foreignKey: "foodId",
    onDelete: "CASCADE"
});

OrderItem.belongsTo(Food, {
    foreignKey: "foodId"
});

module.exports = {
    User,
    Restaurant,
    Food,
    Order,
    OrderItem
};
