const express = require("express"); //Importo la libreria
const app = express(); //Inicializacion de la variable que usara la libreria
const router = express.Router(); // Enrutar los servicios web
const port = 3001; // Escuchar la ejecucion del servidor
require("dotenv").config(); //importo la libreria dotenv

const socket = require("socket.io"); //? importamos la libreria socket.IO

const http = require("http").Server(app);
/* 
?⬆️Esta línea crea un servidor HTTP utilizando el módulo http nativo de Node.js. El servidor HTTP se configura para utilizar una instancia de una aplicación Express (u otro framework compatible con middleware de Node.js, asumiendo que app es una referencia a dicha instancia). Esto significa que todas las solicitudes HTTP recibidas por el servidor serán manejadas por la aplicación Express app
*/

const io = socket(http); //
/* 
?⬆️Esta línea inicializa una nueva instancia de Socket.IO, un framework de WebSockets para Node.js, y la asocia con el servidor HTTP creado previamente. Esto se logra pasando el servidor HTTP http como argumento a la función socket, lo cual probablemente debería ser require('socket.io')(http) para seguir las convenciones típicas de importación y uso de Socket.IO. Esta línea permite que la aplicación maneje conexiones WebSocket a través de Socket.IO, facilitando la comunicación en tiempo real entre el servidor y los clientes conectados.
*/

const { createYoga } = require('graphql-yoga');
const schema = require('./graphql/schema');

const DB_URL = process.env.DB_URL || ""; //creo una variable que bos permitira acceder a la base de datos

const mongoose = require("mongoose"); // Importo la libreria mongoose
mongoose.connect(DB_URL); // Creo la cadena de conexion

const userRoutes = require("./routes/UserRoutes");
const estateRoutes = require("./routes/EstateRoutes");
const messageRoutes = require("./routes/MessageRoutes");

const MessageSchema = require('./models/Message');

//? Metodo [GET, POST, PUT, PATCH, DELETE]
//? Nombre del servicio [/]

router.get("/", (req, res) => {
  //Informacion a modificar
  res.send("Hello world");
});

//? Metodos websocket 

io.on('connect', (socket) => {
  console.log("connected")
  //Escuchando eventos desde el servidor
  socket.on('message', (data) => {
      //? Almacenando el mensaje en la BD */
      var payload = JSON.parse(data)
      console.log(payload)
      //?  Lo almaceno en la BD */
      MessageSchema(payload).save().then((result) => {
          //? Enviando el mensaje a todos los clientes conectados al websocket */
          socket.broadcast.emit('message-receipt', payload)
      }).catch((err) => {
          console.log({"status" : "error", "message" :err.message})
      })        
  })

  socket.on('disconnect', (socket) => {
      console.log("disconnect")    
  })
})

app.use(express.urlencoded({ extended: true })); // Acceder a la informacion de las urls
app.use(express.json()); // Analizar informacion en formato JSON

app.use((req, res, next) => {
  res.io = io;
  next();
});
/* 
?⬆️ Este middleware tiene una funcionalidad específica: asignar la instancia de Socket.IO a la respuesta (res) de cada solicitud que maneje tu aplicación Express
*/

const yoga = new createYoga({ schema });
app.use('/graphql', yoga);

//Ejecuto el servidor
app.use(router);
app.use("/uploads", express.static("uploads"));
app.use("/", userRoutes);
/* app.use("/", estateRoutes); */
app.use("/", messageRoutes)

/** Ejecucion del servidor */
http.listen(port, () => {
  console.log(`Listen on ${port}`);
});
