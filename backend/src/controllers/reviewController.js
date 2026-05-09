const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getBusinessBySlug = async (req, res) => {

  try {

    const { slug } = req.params;

    console.log("Fetching business for slug:", slug);

    const business = await prisma.business.findUnique({
      where: {
        slug,
      },
    });

    console.log("Business found:", business);

    if (!business) {

      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    return res.status(200).json(business);

  } catch (error) {

    console.log("GET BUSINESS ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.submitReview = async (req, res) => {

  try {

    const {
      businessId,
      rating,
    } = req.body;

    const review = await prisma.review.create({
      data: {
        businessId,
        rating,
        isPositive: rating >= 4,
      },
    });

    return res.status(200).json(review);

  } catch (error) {

    console.log("SUBMIT REVIEW ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.submitFeedback = async (req, res) => {

  try {

    const {
      businessId,
      rating,
      name,
      phone,
      message,
    } = req.body;

    const feedback = await prisma.feedback.create({
      data: {
        businessId,
        rating,
        name,
        phone,
        message,
      },
    });

    return res.status(200).json(feedback);

  } catch (error) {

    console.log("SUBMIT FEEDBACK ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};