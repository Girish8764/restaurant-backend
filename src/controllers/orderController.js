const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Food = require("../models/Food");

const createOrder = async (req, res) => {

    try {

        const userId = req.user.id;

        const { items } = req.body;

        let totalAmount = 0;

        for (const item of items) {

            const food = await Food.findByPk(
                item.foodId
            );

            if (!food) {

                return res.status(404).json({
                    message: `Food ${item.foodId} not found`
                });

            }

            totalAmount +=
                food.price * item.quantity;

        }

        const order = await Order.create({

            userId,

            totalAmount,

            status: "PENDING"

        });

        for (const item of items) {

            await OrderItem.create({

                orderId: order.id,

                foodId: item.foodId,

                quantity: item.quantity

            });

        }

        return res.status(201).json({

            message: "Order Created",

            orderId: order.id,

            totalAmount

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Order creation failed"
        });

    }

};

module.exports = {
    createOrder
};
