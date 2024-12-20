//require packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//require routes
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');

//load environment variables
dotenv.config();

// Initialize express
const app = express()

//middleware
app.use(express.json());

//logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
})

// Use routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);

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