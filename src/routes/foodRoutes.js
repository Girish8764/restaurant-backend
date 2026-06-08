const express = require("express");

const router = express.Router();

const {
    createFood,
    getFoodsByRestaurant
} = require("../controllers/foodController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

router.get(
    "/restaurant/:restaurantId",
    getFoodsByRestaurant
);

router.post(
    "/restaurant/:restaurantId",
    authenticate,
    authorize("ADMIN"),
    createFood
);

module.exports = router;
