import State from "../state/state";

export default class BasicMessageHandler {

  constructor(socket: SocketIO.Socket) {

    socket.on('disconnect', () => {

      const { player, room } = State.instance.lookupPlayer(socket);

      if (player !== undefined && room !== undefined) {
        player.connected = false;
        State.instance.socketPlayerMap.delete(socket);
        socket.broadcast.to(room!.id).emit("playerDisconnect", JSON.stringify(player));
        console.log("User disconnected.");
      } else {
        console.warn("Room or player undefined. Cannot properly disconnect client.");
      }
      
    });

    socket.on('message', (message: string) => {
      console.log(`[RECV]: ${message}`)
    });
  }

}