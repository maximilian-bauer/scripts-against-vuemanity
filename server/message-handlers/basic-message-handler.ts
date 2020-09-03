import State from "../state/state";

import RoomModel from "../../shared/room";

import WhiteCardModel from "../../shared/card-white";
import ServerRoomModel from "../classes/server-room";
import ServerPlayerModel from "../classes/server-player";


export default class BasicMessageHandler {

  constructor(socket: SocketIO.Socket) {

    socket.on('disconnect', () => {
      console.log("User disconnected.");
      const playerReference: {room: string, nickname: string} | undefined = State.instance.socketPlayerMap.get(socket);

      if(playerReference !== undefined){
        const room: RoomModel | undefined = State.instance.rooms.get(playerReference.room);
        const player = room?.players.get(playerReference.nickname);
        if(player !== undefined) {
          player.connected = false;
          State.instance.socketPlayerMap.delete(socket);
          socket.broadcast.to(room!.id).emit("playerDisconnect", JSON.stringify(player));
        }
      }
    });
    
    socket.on('message', (message: string) => {
      console.log(`[RECV]: ${message}`)
    });
  }

}