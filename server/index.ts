import State from "./state/state";
import BasicMessageHandler from "./message-handlers/basic-message-handler";
import RoomMessageHandler from "./message-handlers/room-message-handler";
import CardMessageHandler from "./message-handlers/card-message-handler";

const app = require('express')();
const http = require('http').Server(app);
const socketIOServer: SocketIO.Server = require('socket.io')(http);

http.listen(3000, () => {
  console.log('Listening on port *: 3000');
});

socketIOServer.on('connection', (socket: SocketIO.Socket) => {

  console.log("User connected.");
  
  const basicHandler = new BasicMessageHandler(socket);
  const roomHandler = new RoomMessageHandler(socket);
  const cardHandler = new CardMessageHandler(socket);
  
  socket.emit('roomNames', Array.from(State.instance.rooms.keys()));

});


