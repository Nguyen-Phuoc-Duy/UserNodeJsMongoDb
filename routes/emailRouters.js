var express = require("express");
var router = express.Router();
const Transporter = require("../config/mail");
/* GET users listing. */
router.post("/test", function (req, res, next) {
  const mailOption = {
    from: "nguyenphuocduy290801@gmail.com",
    to: "nguyenphuocduy2908@gmail.com",
    subject: "test mail",
    text:'this is test mail sent NodeJs Project'
  };
  Transporter.sendMail(mailOption, function(error, info){
    if(error){
        res.status(500).json({message: 'send mail fail ' + error})
    }
    else {
        res.status(200).json({message: 'send mail success ' + info.response})
    }
  })
});

module.exports = router;
