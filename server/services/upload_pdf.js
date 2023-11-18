const multer = require('multer');
const path = require('path');

exports.storage_pdf = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/pdf_user/');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() +path.extname(file.originalname));
    }
  });

exports.imageFilterPDF = (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf|PDF)$/)) {
        req.fileValidationError = 'Only PDF files are allowed!';
        return cb(new Error('Only PDF files are allowed!'), false);
    }
    cb(null, true);
};