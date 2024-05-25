var express = require("express");
var router = express.Router();
const modelFruit = require("../models/fruit");
const Upload = require("../config/upload");
/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource fruit test");
});

router.post("/add", Upload.array("images", 5), async (req, res) => {
  try {
    const { files } = req;

    // Generate URLs for the uploaded files
    const urlImages = files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );
    const model = new modelFruit(req.body);
    model.images = urlImages
    const result = await model.save(); // them du lieu vao database
    if (result) {
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
//add data
// router.post("/add", async (req, res) => {
//   try {
//     const model = new modelFruit(req.body);
//     const result = await model.save(); // them du lieu vao database
//     if (result) {
//       res.json({
//         status: 200,
//         message: "them thanh cong",
//         data: result,
//       });
//     } else {
//       res.json({
//         status: 400,
//         message: "them that bai",
//         data: [],
//       });
//     }
//     // res.send(result);
//   } catch (error) {
//     console.log(error);
//   }
// });

//
router.get("/list", async (req, res) => {
  const result = await modelFruit.find().populate("id_distributor");
  try {
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await modelFruit
      .findById(req.params.id)
      .populate("id_distributor");
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
    const result = await modelFruit
      .findByIdAndUpdate(req.params.id, req.body)
      .populate("id_distributor");
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
    const result = await modelFruit
      .findByIdAndDelete(req.params.id)
      .populate("id_distributor");
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

router.get("/getListByPrice", async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = { price: { $gte: start, $lte: end } };
    console.log(query, "hhh");
    const result = await modelFruit
      .find(query, "name price quantity id_distributor") // khong lay status
      .populate("id_distributor") // join bang thanh 1 obj
      .sort({ quantity: -1 }) // -1 giam dan, 1 tang dan
      .skip(0) //bo qua so luong row
      .limit(2); // gioi han so luong phan tu lay ra
    res.json({
      status: 200,
      message: "danh sach fruit",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
