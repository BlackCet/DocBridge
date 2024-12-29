//require packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http'); // For creating the HTTP server
const { Server } = require('socket.io'); // For WebSocket functionality

//require routes
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');

//load environment variables
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

// Middleware
app.use(express.json());

// Use CORS middleware to allow requests from specific origins (like your frontend)
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend to make requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow specific methods
  credentials: true, // Allow cookies or authentication headers to be sent
}));

//logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Use routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);

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





// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// app.use(cors());

// // Create HTTP server and socket.io instance
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// // Middleware for serving static files
// app.use(express.static(path.join(__dirname, 'dist')));

// // Chat route with socket.io integration
// app.use('/api/chat', (req, res) => {
//   res.json({ message: 'Chat API route is working' });
// });

// // Serve React's index.html for non-API routes
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });

// // Socket.io connection handling
// io.on('connection', (socket) => {
//   console.log(`New WebSocket connection established: ${socket.id}`);

//   socket.on('join_room', (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on('send_message', (data) => {
//     console.log(data);
//     socket.to(data.room).emit('receive_message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log(`WebSocket connection closed for ID: ${socket.id}`);
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
