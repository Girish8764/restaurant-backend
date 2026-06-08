const express = require("express");

const router = express.Router();

const {
    createRestaurant,
    getRestaurants
} = require("../controllers/restaurantController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

router.get(
    "/",
    getRestaurants
);

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    createRestaurant
);

module.exports = router;
