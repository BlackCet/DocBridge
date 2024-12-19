//require packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//load environment variables
dotenv.config();

// Initialize express
const app = express()

//middleware
app.use(express.json());

//connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connected to database, app listening on port ${process.env.PORT}`);
    })
  })
  .catch((error) => {
    console.log(error)
  })