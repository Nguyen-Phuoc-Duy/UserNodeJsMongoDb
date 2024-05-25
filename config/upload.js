const multer = require('multer');

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Set the destination folder for uploads
    cb(null, 'public/uploads/');
  },
  filename: function(req, file, cb) {
    // Set the filename for the uploaded file
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize Multer with the storage configuration and file size limit
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
  }
});

// Export the upload module
module.exports = upload;
