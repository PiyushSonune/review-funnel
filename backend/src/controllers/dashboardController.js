const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllBusinesses = async (req, res) => {

  const businesses =
    await prisma.business.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  res.json(businesses);
};

exports.getBusinessAnalytics = async (req, res) => {

  const businessId = req.params.id;

  const totalScans =
    await prisma.scan.count({
      where: { businessId },
    });

  const totalRatings =
    await prisma.review.count({
      where: { businessId },
    });

  const positiveReviews =
    await prisma.review.count({
      where: {
        businessId,
        isPositive: true,
      },
    });

  const negativeReviews =
    await prisma.review.count({
      where: {
        businessId,
        isPositive: false,
      },
    });

  const conversionRate =
    totalScans > 0
      ? ((totalRatings / totalScans) * 100).toFixed(1)
      : 0;

  res.json({
    totalScans,
    totalRatings,
    positiveReviews,
    negativeReviews,
    conversionRate,
  });
};

exports.getBusinessFeedbacks = async (req, res) => {

  const feedbacks =
    await prisma.feedback.findMany({
      where: {
        businessId: req.params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  res.json(feedbacks);
};