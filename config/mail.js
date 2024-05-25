const nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "nguyenphuocduy290801@gmail.com",
    pass: "sjdz efrq icqm hsov",
  },
});
module.exports = transporter;
