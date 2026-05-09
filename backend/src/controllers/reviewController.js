const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getBusinessBySlug = async (req, res) => {

  const business =
    await prisma.business.findUnique({
      where: {
        slug: req.params.slug,
      },
    });

  res.json(business);
};

exports.submitReview = async (req, res) => {

  const {
    businessId,
    rating,
  } = req.body;

  const review =
    await prisma.review.create({
      data: {
        businessId,
        rating,
        isPositive: rating >= 4,
      },
    });

  res.json(review);
};

exports.submitFeedback = async (req, res) => {

  const {
    businessId,
    rating,
    name,
    phone,
    message,
  } = req.body;

  const feedback =
    await prisma.feedback.create({
      data: {
        businessId,
        rating,
        name,
        phone,
        message,
      },
    });

  res.json(feedback);
};