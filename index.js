const express = require('express');
const app = express();
const port = 5000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to Mongoose"))
.catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})