import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploadFiles',
  filename: (req, res, next) => {
    next(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, next) => {
    checkFileType(file, next);
  }
}).single('myFile');

function checkFileType(file, next) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return next(null, true);
  } else {
    next('Error: Images only! (jpeg, jpg, png, gif)');
  }
}