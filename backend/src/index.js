const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const route = require("./routes/user");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors=require("cors")

dotenv.config({ path: "config.env" });
const app = express();
const multer = require("multer");

app.use(cors())   //enable cors
app.use(express.json());  //parsing json data
app.use(multer().any());  //parsing multiform data
app.use(cookieParser());   //for storing in cookies

mongoose
  .connect((process.env.DB_URI || "mongodb+srv://NishantRathore:nhDG0WDTCrelUKJU@cluster0.usryq6s.mongodb.net/techrev"))
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err.message));

app.use("/", route);

app.use(errorHandler); //middleware for error

app.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on ${process.env.PORT || 4000}`);
});
