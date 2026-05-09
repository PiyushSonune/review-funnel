const router = require("express").Router();

const {
  getBusinessBySlug,
  submitReview,
  submitFeedback,
} = require("../controllers/reviewController");

router.get("/:slug", getBusinessBySlug);

router.post("/submit", submitReview);

router.post("/feedback", submitFeedback);

module.exports = router;