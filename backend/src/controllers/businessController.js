const { PrismaClient } = require("@prisma/client");
const generateQR = require("../utils/generateQR");

const prisma = new PrismaClient();


// CREATE BUSINESS
exports.createBusiness = async (req, res) => {

  try {

    const {
      name,
      slug,
      logo,
      googleReviewUrl,
    } = req.body;

    // CHECK EXISTING SLUG
    const existingBusiness =
      await prisma.business.findUnique({
        where: {
          slug,
        },
      });

    if (existingBusiness) {
      return res.status(400).json({
        error: "Slug already exists",
      });
    }

    // CREATE BUSINESS
    const business =
      await prisma.business.create({
        data: {
          name,
          slug,
          logo,
          googleReviewUrl,
        },
      });

    // FRONTEND REVIEW URL
    const reviewUrl =
      `https://review-funnel-frontend.vercel.app/r/${slug}`;

    // GENERATE QR
    const qrImage =
      await generateQR(reviewUrl);

    // SAVE QR
    await prisma.qRCode.create({
      data: {
        businessId: business.id,
        qrImageUrl: qrImage,
      },
    });

    res.json({
      success: true,
      business,
      qrImage,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};


// GET ALL BUSINESSES
exports.getAllBusinesses = async (req, res) => {

  try {

    const businesses =
      await prisma.business.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          reviews: true,
          feedbacks: true,
          scans: true,
        },
      });

    res.json(businesses);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};


// GET SINGLE BUSINESS
exports.getBusinessById = async (req, res) => {

  try {

    const business =
      await prisma.business.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          reviews: true,
          feedbacks: true,
          scans: true,
        },
      });

    if (!business) {
      return res.status(404).json({
        error: "Business not found",
      });
    }

    res.json(business);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};


// DELETE BUSINESS
exports.deleteBusiness = async (req, res) => {

  try {

    await prisma.business.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
      message: "Business deleted",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};


// BUSINESS ANALYTICS
exports.getBusinessAnalytics = async (req, res) => {

  try {

    const businessId = req.params.id;

    // TOTAL SCANS
    const totalScans =
      await prisma.scan.count({
        where: {
          businessId,
        },
      });

    // TOTAL REVIEWS
    const totalReviews =
      await prisma.review.count({
        where: {
          businessId,
        },
      });

    // POSITIVE REVIEWS
    const positiveReviews =
      await prisma.review.count({
        where: {
          businessId,
          isPositive: true,
        },
      });

    // NEGATIVE REVIEWS
    const negativeReviews =
      await prisma.review.count({
        where: {
          businessId,
          isPositive: false,
        },
      });

    // TOTAL FEEDBACKS
    const feedbacks =
      await prisma.feedback.findMany({
        where: {
          businessId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    // CONVERSION %
    const conversionRate =
      totalScans > 0
        ? ((totalReviews / totalScans) * 100).toFixed(1)
        : 0;

    res.json({
      totalScans,
      totalReviews,
      positiveReviews,
      negativeReviews,
      conversionRate,
      feedbacks,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};