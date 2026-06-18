const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = require("./src/config/database");

// Models
const User = require("./src/models/User");
const Restaurant = require("./src/models/Restaurant");

// Middlewares
const authenticate = require("./src/middleware/authMiddleware");
const authorize = require("./src/middleware/roleMiddleware");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const restaurantRoutes = require("./src/routes/restaurantRoutes");
const Food = require("./src/models/Food"); 
require("./src/models");
const app = express();

const foodRoutes = require("./src/routes/foodRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

// Global Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

/* API ROUTES */

app.use("/api/auth", authRoutes);
app.use(
    "/api/orders",
    orderRoutes
);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);
/* HEALTH CHECK */

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "WORKING_NOW_FINE_with_trivys",
    service: "restaurant-backend"
  });
});

/* ADMIN TEST ROUTE */

app.get(
  "/api/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin",
      user: req.user
    });
  }
);

const startServer = async () => {
  try {

    await sequelize.authenticate();

    console.log("MySQL Connected");

    await sequelize.sync();

    console.log("Database Synced");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server Running On Port ${process.env.PORT}`
      );
    });

  } catch (error) {

    console.error("Database Connection Failed");

    console.error(error);

    process.exit(1);
  }
};

startServer();
