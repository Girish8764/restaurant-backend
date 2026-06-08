const Restaurant = require("../models/Restaurant");

const createRestaurant = async (req, res) => {

    try {

        const restaurant = await Restaurant.create(req.body);

        res.status(201).json({
            message: "Restaurant created successfully",
            restaurant
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const getRestaurants = async (req, res) => {

    try {

        const restaurants = await Restaurant.findAll();

        res.status(200).json(restaurants);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    createRestaurant,
    getRestaurants
};
