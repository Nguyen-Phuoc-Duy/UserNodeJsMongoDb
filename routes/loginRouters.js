var express = require("express");
var router = express.Router();
const modelUser = require("../models/user");
const JWT = require("jsonwebtoken");
const SECRET_KEY = "phzuy";
/* GET users listing. */
router.post("/checkLogin", async (req, res) => {
    // res.send('aaaaaaaaaaaa')
  try {
    const { username, password } = req.body;
    const user = await modelUser.findOne({ username, password });
    console.log(user);
    if(user){
        const token = JWT.sign({id:user.id}, SECRET_KEY, {expiresIn:'1h'})
        const refreshToken = JWT.sign({id:user.id}, SECRET_KEY, {expiresIn:'1d'})
        res.json({
            status: 200,
            message: 'dang nhap thanh cong',
            data: user,
            token: token,
            refreshToken: refreshToken

        })
    }
  } catch (error) {res.json({
    status: 400,
    message: 'dang nhap that bai',
    data: [],

})}
});

module.exports = router;
