const multer = require("multer");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "salon-management",
    resource_type: "auto",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "avif",
      "mp4",
      "mkv",
      "webm",
    ],

    public_id:
      Date.now() + "-" + file.originalname,
  }),
});

const upload = multer({
  storage,
});

module.exports = upload;