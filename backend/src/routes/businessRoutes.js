const express = require("express");

const router = express.Router();

const {
  createBusiness,
  getAllBusinesses,
  getBusinessAnalytics,
  getBusinessById,
  deleteBusiness,
} = require("../controllers/businessController");


// CREATE BUSINESS
router.post(
  "/create",
  createBusiness
);


// GET ALL BUSINESSES
router.get(
  "/all",
  getAllBusinesses
);


// GET SINGLE BUSINESS ANALYTICS
router.get(
  "/analytics/:id",
  getBusinessAnalytics
);


// GET SINGLE BUSINESS
router.get(
  "/:id",
  getBusinessById
);


// DELETE BUSINESS
router.delete(
  "/:id",
  deleteBusiness
);


module.exports = router;