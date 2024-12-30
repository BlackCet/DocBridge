// require packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http'); // For creating the HTTP server
const { Server } = require('socket.io'); // For WebSocket functionality

// require routes
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require("./routes/appointmentRoutes");

// load environment variables
dotenv.config();

// Initialize express
const app = express();


// Create the HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow your frontend origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// middleware
app.use(express.json());

// Use CORS middleware to allow requests from specific origins (like your frontend)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Allow dynamic frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

// logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Use routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log(`New WebSocket connection established: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on('disconnect', () => {
    console.log('WebSocket connection closed.');
  });
});

// Error handling middleware (after all routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});


//connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => { // Use `server` instead of `app`
      console.log(`connected to database, app listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });