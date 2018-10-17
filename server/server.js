const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("new user connected");

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user join'));

  socket.on('createMessage', (message) => {
      console.log('createMessage', message);
      // io.emit('newMessage', {
      //   from: message.from,
      //   text: message.text,
      //   createdAt: new Date().getTime()
      // });
      socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
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
