const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => { ///cuando un usuario se conecta se ejecuta esta funcion ///socket representa a un usuario en especifico y //io representa a todos los que estan conectados
  console.log('🔌 Un usuario se conectó');

  socket.on('chat message', (msg) => { ///cuando un usuario ejecute chat message entra aca y pasa el parametro msg que es el mensaje
    io.emit('chat message', msg); ///envia a todos los clientes el msg
  });

  socket.on('disconnect', () => {
    console.log('❌ Un usuario se desconectó');
  });
});







server.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});
