const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const businessRoutes = require("./routes/businessRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://review-funnel-frontend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());

app.use("/api/business", businessRoutes);
app.use("/api/review", reviewRoutes);

module.exports = app;