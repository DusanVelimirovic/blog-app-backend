const express = require('express');
const app = express();
const port = 5000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/post");
const catRoute = require("./routes/categories");
const multer = require("multer");



dotenv.config();

//allow us to send any json object
app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to Mongoose"))
.catch(err => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//auth route
app.use("/api/auth", authRoute);

//user route
app.use("/api/users", usersRoute);

//post route
app.use("/api/post", postRoute);

//category route
app.use("/api/categories", catRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})