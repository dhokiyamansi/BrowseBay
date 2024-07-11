const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error(
          "Only image files can be uploaded (Supported formats: jpg, png and jpeg)"
        )
      );
    }
  },
});
