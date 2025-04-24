import path from "node:path";
import multer from "multer";
import HttpError from "../helpers/HttpError.js";

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, callback) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileName = `${uniquePrefix}_${file.originalname}`;
    callback(null, fileName);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  const extension = file.originalname.split(".").pop();

  if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
    return callback(HttpError(400, "Incorrect avatar format"));
  }
  callback(null, true);
};
const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
