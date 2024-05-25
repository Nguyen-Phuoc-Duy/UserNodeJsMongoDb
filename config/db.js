const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// const atlat = "mongodb://localhost:27017/MyDB";
const atlat = "mongodb+srv://phzuy:LOnAYUJbSPqj54Q2@cluster0.n96lrml.mongodb.net/myDB?retryWrites=true&w=majority&appName=Cluster0"
const connect = async () => {
  try {
    await mongoose.connect(atlat, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect success");
  } catch (error) {
    console.log("connect fail");
    console.error(error);
  }
};
 module.exports = {connect}