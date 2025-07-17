import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    return cb(new Error("Invalid file type."), false);
  }
};

const maxSize = 5 * 1024 * 1024;

// const fileLimits = {
//   fileSize: maxSize,
//   files: 4,
//   fileSize: maxSize,
// };

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: fileLimits,
});


