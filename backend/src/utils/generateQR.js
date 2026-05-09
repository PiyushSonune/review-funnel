const QRCode = require("qrcode");

const generateQR = async (url) => {
  return await QRCode.toDataURL(url);
};

module.exports = generateQR;