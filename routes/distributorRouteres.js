var express = require("express");
var router = express.Router();
const modelDistributor = require("../models/distributor");
/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource user test");
});

//add data
router.post("/add", async (req, res) => {
  try {
    const model = new modelDistributor(req.body);
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

//
router.get("/list", async (req, res) => {
  const result = await modelDistributor.find({});
  try {
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await modelDistributor.findById(req.params.id);
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

router.put("/edit/:id", async (req, res) => {
  try {
    const result = await modelDistributor.findByIdAndUpdate(req.params.id, req.body);
    if (result) {
      const rs = result.save()
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
    const result = await modelDistributor.findByIdAndDelete(req.params.id);
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
