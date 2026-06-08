const express = require("express");

const router = express.Router();

const {
    createOrder
} = require("../controllers/orderController");

const authenticate =
require("../middleware/authMiddleware");

router.post(
    "/",
    authenticate,
    createOrder
);

module.exports = router;
