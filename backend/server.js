// // require packages
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

// //require routes
// const doctorRoutes = require('./routes/doctorRoutes');
// const patientRoutes = require('./routes/patientRoutes');
// const { applyDefaults } = require('./models/doctorModel');

// //load environment variables
// dotenv.config();

// // Initialize express
// const app = express();

// // middleware
// app.use(express.json());

// //cors middleware
// app.use(cors());

// //logger middleware
// app.use((req, res, next) => {
  //   console.log(`${req.method} ${req.path}`);
  //   next();
  // })
  
  // // Use routes
  // app.use('/api/doctors', doctorRoutes);
  // app.use('/api/patients', patientRoutes);
  
  // //connect to database
  // mongoose.connect(process.env.MONGO_URI)
  //   .then(() => {
    //     // listen for requests
    //     app.listen(process.env.PORT, () => {
      //       console.log(`connected to database, app listening on port ${process.env.PORT}`);
      //     })
      //   })
      //   .catch((error) => {
        //     console.log(error)
        //   })
        
        
        
        
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server} = require('socket.io');

const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});


app.use(express.static(path.join(__dirname, 'dist')));
// Serve React's index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log(`New WebSocket connection established : ${socket.id}`);

  // socket.emit('message', 'Welcome to ChatCord');
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // console.log(data);
    socket.to(data.room).emit("receive_message", data);
  })

  socket.on('disconnect', () => {
    console.log('WebSocket connection closed.');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
