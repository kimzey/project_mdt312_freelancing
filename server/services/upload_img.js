const multer = require('multer');
const path = require('path');

exports.storage_img = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/img_user/');
    },

    filename: (req, file, cb) => {
      console.log(file.originalname.trim());
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

exports.storage_img_post = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/post_img/');
  },

  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() +path.extname(file.originalname));
  }
});

exports.imageFilterIMG = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};