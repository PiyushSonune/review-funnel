const { PrismaClient } = require("@prisma/client");
const generateQR = require("../utils/generateQR");

const prisma = new PrismaClient();

exports.createBusiness = async (req, res) => {
  try {

    const {
      name,
      slug,
      logo,
      googleReviewUrl,
    } = req.body;

    const business = await prisma.business.create({
      data: {
        name,
        slug,
        logo,
        googleReviewUrl,
      },
    });

    const reviewUrl =
  `http://192.168.140.80/r/${slug}`;

    const qrImage =
      await generateQR(reviewUrl);

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

    res.status(500).json({
      error: error.message,
    });
  }
};