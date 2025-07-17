import path from "path";
import multer from "multer";
import uuid4 from "uuid4";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/order_item");
  },
  filename: (req, file, cb) => {
    cb(null, uuid4() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ["application/json"];

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

export const upload1 = multer({
  storage: storage,
  // fileFilter: fileFilter,
  // limits: fileLimits,
});
