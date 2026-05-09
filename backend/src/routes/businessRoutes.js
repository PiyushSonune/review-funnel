const router = require("express").Router();

const {
  createBusiness,
} = require("../controllers/businessController");

router.post("/create", createBusiness);

module.exports = router;