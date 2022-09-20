const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Escuchando en el puerto', process.env.PORT || 3000);
});

io.on('connection', (socket) => {
  console.log('User: ', socket.id, ' connected');

  socket.on('disconnect', () => {
    console.log('User: ', socket.id, ' disconnected');
  });

  socket.on('chat message', (user, msg) => {
    io.emit('chat message', user, msg);
    console.log(user + ": " + msg);
  });
});
