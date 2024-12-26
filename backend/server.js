//require packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//require routes
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');

//load environment variables
dotenv.config();

// Initialize express
const app = express()

// Use CORS middleware to allow requests from specific origins (like your frontend)
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend to make requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow specific methods
  credentials: true, // Allow cookies or authentication headers to be sent
}));

//middleware
app.use(express.json());

//cors middleware
app.use(cors());

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