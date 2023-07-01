const multer = require('multer');
const {responseMulterError} = require('../helper/responseMulterError');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../src/asset');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, Date.now() + '_' + name);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    const error = 'Only jpg, jpeg, png allowed!';
    responseMulterError(req.res, '', 500, error);
  }
};

const multerUpload = multer({
  storage,
  fileFilter,
  limits: {fileSize: 2 * 1024 * 1024},
}).single('photoPath');

module.exports = multerUpload;
