const PORT = 4000;

const ws = require('ws');
const express = require('express');
const app = express();
const questionGen = require('./questionGeneration');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Quack you');
});

app.get('/question', (req, res) => {
  const { amount } = req.query;
  let questions = [];

  for (var i=0;i<amount;i++) {
    questions.push(questionGen()());
  }
  
  console.log(req.originalUrl);
  res.send(questions)
});

let sockets=[];
const socket_server = new ws.Server({ noServer: true });

//https://masteringjs.io/tutorials/node/websocket-server
socket_server.on('connection', socket => {
  sockets.push(socket);

  socket.on('message', function(msg) {
    console.log(`socket: forwarding message to other sockets: ${msg}`);
    sockets.forEach(s => s.send(msg));
  });

  socket.on('close', function() {
    sockets = sockets.filter(s => s !== socket);
  });
});

const http_server = app.listen(PORT, () => {
  console.log(`HTTP server is running on http://localhost:${PORT}`);
});

http_server.on('upgrade', (request, socket, head) => {
  socket_server.handleUpgrade(request, socket, head, socket => {
    console.log('socket upgraded');
    socket_server.emit('connection', socket, request);
  });
});