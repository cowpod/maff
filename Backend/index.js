const PORT = 4000;

const ws = require('ws');
const express = require('express');
const cors = require('cors');
const app = express();
const questionGen = require('./questionGeneration');
const leaderboards = require('./leaderboard');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Quack you');
});

app.get('/question', (req, res) => {
  const { amount,difficulty } = req.query;
  let questions = [];

  for (var i=0;i<amount;i++) {
    let gen = questionGen()(difficulty);
    console.log(gen);
    questions.push(gen);
  }

  console.log(req.originalUrl);
  res.send(questions)
});

app.get('/leaderboard', async (req, res) => {
  let top = await leaderboards.getLeaderboard();
  console.log(top);
  console.log(req.originalUrl);
  res.send(top)
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