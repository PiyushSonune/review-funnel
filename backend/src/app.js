const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const businessRoutes = require("./routes/businessRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/business", businessRoutes);
app.use("/api/review", reviewRoutes);

module.exports = app;