const express = require('express');
const app = express();
const port = 5000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");

dotenv.config();

//allow us to send any json object
app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to Mongoose"))
.catch(err => console.log(err));

//auth route
app.use("/api/auth", authRoute);

//user route
app.use("/api/users", usersRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})