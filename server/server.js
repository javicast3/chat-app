const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("new user connected");

  socket.emit('newMessage', {
    from: 'John',
    text: 'See you then',
    createdAt:123123
  });

  socket.on('createMessage', (message) => {
      console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log("User was disconnected");
  });


});


const port = process.env.PORT || 3000;


server.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
