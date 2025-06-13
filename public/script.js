
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const mensajes = document.getElementById('messages');

form.addEventListener('submit', (e) => { ///cuando un usuario ejecuta el form se ejecuta una funcion //el pararametro es un objeto generado por el form automaticamente
    e.preventDefault(); ///esto le indica al navegador que no recargue la pagina
    if (input.value.trim()) { 
      socket.emit('chat message', input.value); ///esto envia datos al servidor, justamente a 'chat message'
      input.value = '';
    }
});

// Cuando recibimos un mensaje del servidor
socket.on('chat message', function (msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  mensajes.appendChild(item);
  mensajes.scrollTop = mensajes.scrollHeight; // Baja al último mensaje
});