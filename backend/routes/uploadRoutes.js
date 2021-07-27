import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extName = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extName && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/productupload", upload.array("image", 4), (req, res, next) => {
  const files = req.files;
  if (!files) {
    new Error("Please select a Image");
  }
  res.send(req.files);
});

router.post("/showcaseupload", upload.single("image"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    new Error("Please select a Image");
  }
  res.send(req.file);
});

export default router;
