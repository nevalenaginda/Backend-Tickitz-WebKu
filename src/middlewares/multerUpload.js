const multer = require("multer");
const {
  large,
  notAcceptable,
  failed,
  response,
} = require("../helpers/response");
const path = require("path");
const limitFile = 2;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// setting conneting multer with storage
const multerUploadImg = multer({
  storage: storage,
  limits: {
    fileSize: limitFile * 1024 * 1024, // MegaByte(s)
  },
  // custom extension
  fileFilter: (req, file, callback) => {
    const typeExt = path.extname(file.originalname);
    if (
      typeExt === ".jpg" ||
      typeExt === ".JPG" ||
      typeExt === ".png" ||
      typeExt === ".PNG" ||
      typeExt === ".jpeg" ||
      typeExt === ".JPEG"
    ) {
      callback(null, true);
    } else {
      callback(
        {
          error: "Wrong type extention! Please upload like png/PNG/jpg/JPG.",
          code: "typeExtWrong",
        },
        false
      );
    }
  },
});

// make middleware
const singleUploadimg = (req, res, next) => {
  // process upload
  const multerSingle = multerUploadImg.single("image"); // name file
  if (multerSingle) {
    multerSingle(req, res, (error) => {
      if (error) {
        // console.log(error)
        if (error.code === "LIMIT_FILE_SIZE") {
          return response(res, [], {}, 413, {
            message: `File size exceeds the ${limitFile} Mb limit`,
            error: error.message,
          });
        } else if (error.code === "typeExtWrong") {
          return response(res, [], {}, 406, {
            message:
              "Wrong type extention! Please upload file  png/PNG/jpg/JPG.",
            error: error.message,
          });
        } else {
          return response(res, [], {}, 500, {
            message: "Internal server error!.",
            error: error.message,
          });
        }
      } else {
        next();
      }
    });
  } else {
    next();
  }
};

module.exports = {
  singleUploadimg,
};
