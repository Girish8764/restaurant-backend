const Food = require("../models/Food");

const createFood = async (req, res) => {

    try {

        const restaurantId = req.params.restaurantId;

        const food = await Food.create({

            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            restaurantId

        });

        return res.status(201).json(food);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Food creation failed"
        });

    }

};

const getFoodsByRestaurant = async (req, res) => {

    try {

        const restaurantId = req.params.restaurantId;

        const foods = await Food.findAll({
            where: { restaurantId }
        });

        return res.status(200).json(foods);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch foods"
        });

    }

};

module.exports = {
    createFood,
    getFoodsByRestaurant
};
