var express = require("express");
var router = express.Router();
const Upload = require("../config/upload");
/* GET users listing. */
router.post("/test", function (req, res, next) {
  res.send("respond with a resource upload test");
});

router.post('/mulUpload', Upload.array('images', 5), async (req, res) => {
    try {
      // Extract data from the request
      // const data = req.body;
      const { files } = req;
  
      // Generate URLs for the uploaded files
      const urlImages = files.map(file => 
        `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      );
  
      // Log the URLs and send a response
      console.log(urlImages);
      // res.status(200).json({ message: 'Files uploaded successfully', urls: urlImages });
    } catch (error) {
      // Handle errors
      console.log(error);
      // res.status(500).json({ message: 'Error uploading files', error });
    }
  });

   module.exports = router