    let socket; ///creamos el socket pero todavia no lo inicializamos, asi evitamos conexion al servidor sin antes validar el nombre

    const nombre = sessionStorage.getItem('Username') //obtenemos el Username del session storage

    console.log('1. Nombre obtenido del sessionStorage:', nombre);

    if (nombre == null) { ///validamos si el nombre existe
      window.location.href = 'info.html'; // si no existe entramos aca
    }
    else {
      socket = io(); //si existe el nombre creamos la conexion al servidor
    }

    ///referencias
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const mensajes = document.getElementById('messages');
    const usuariosConectados = document.getElementById('usuarios-conectados')
    const contador = document.getElementById('onlineCount')

    form.addEventListener( ///cuando se hace submit en el form se ejecuta la func anonima
      'submit', 
      function(e) { ///el parametro e es un objeto generado por el formulario con los datos del mismo

        e.preventDefault(); ///esto le indica al navegador que no recargue la pagina

        if (input.value.trim()) { 

          socket.emit('chat message', { //esto le emite al socket, a chat-message, un mensaje y el usuario que lo mando
            mensaje: input.value,
            usuario: nombre
          }); 
          input.value = '';

        }
    });


    socket.on( //escucha al socket, justamente a online users
      'online users', 
      function (users) { //cuando lo escucha ejecuta esta funcion

      console.log(users);
      
      usuariosConectados.innerHTML = ''; //aca limpiamos lo que hay dentro de la lista para cargar la nueva

      contador.textContent = users.length; //cambia el contenido del contado por la longitud del array
      
      users.forEach(element => { //bucle por cada elemento del array

        const newItem = document.createElement('li'); //crea una lista

        newItem.textContent = element.nombre; //a esa lsita le carga el nombre

        usuariosConectados.appendChild(newItem); //se le agrega un hijo(newItem) al padre(usuariosConectados)

      });

    })

    socket.on( //escuchamos al socket // a chat message
      'chat message', 
      function (msg) { //cuando escuchamos ejecutamos esta funcion

      const item = document.createElement('li'); 

      item.innerHTML = `<strong>${msg.usuario}:</strong> ${msg.mensaje}`;

      mensajes.appendChild(item);

      mensajes.scrollTop = mensajes.scrollHeight; // Baja al último mensaje
    });

    socket.on(
      'connect', 
      function() {

      console.log('2. Socket conectado, enviando nombre:', nombre);

      socket.emit('enviar-nombre', nombre); //emitimos nuestro nombre al socket

    });