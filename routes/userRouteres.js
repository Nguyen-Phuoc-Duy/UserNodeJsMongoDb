var express = require("express");
var router = express.Router();
const modelUser = require("../models/user");
const Transporter = require("../config/mail");
const Upload = require("../config/upload");
/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource user test");
});

//add data
// router.post("/add", Upload.array('images', 5), async (req, res) => {
router.post("/add", Upload.single("avatar"), async (req, res) => {
  try {
    const { file } = req;
    const urlImages = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    const model = new modelUser(req.body);
    model.avatar = urlImages;
    const result = await model.save(); // them du lieu vao database
    if (result) {
      const mailOption = {
        from: "nguyenphuocduy290801@gmail.com",
        to: model.email, //mail ng dung dang ky
        subject: "Welcom to NodeJs",
        text: "chuc mung dang ky thanh cong",
      };
      await Transporter.sendMail(mailOption);
      res.json({
        status: 200,
        message: "them thanh cong",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "them that bai",
        data: [],
      });
    }
    // res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//
router.get("/list", async (req, res) => {
  const result = await modelUser.find({});
  try {
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await modelUser.findById(req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.json({
        status: 400,
        message: "khong tim thay du lieu",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Invalid ID formart");
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const result = await modelUser.findByIdAndUpdate(req.params.id, req.body);
    if (result) {
      const rs = result.save();
      res.send(rs);
    } else {
      res.json({
        status: 400,
        message: "khong tim thay du lieu",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Invalid ID formart");
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await modelUser.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({
        status: 200,
        message: "xoa thanh cong",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "xoa that bai",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Invalid ID formart");
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});
module.exports = router;
