const express = require('express');
const app = express();
const http = require('https://jeflh-chat-nodejs.herokuapp.com/');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (user, msg) => {
    console.log(user + ": " + msg);
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});

io.on('connection', (socket) => {
  socket.on('chat message', (user, msg) => {
    io.emit('chat message', user, msg);
  });
});
