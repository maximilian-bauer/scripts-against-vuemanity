import State from "../state/state";

import PlayerModel from "../../shared/player";
import RoomModel from "../../shared/room";
import RoomOptions from "../../shared/room-options";

import WhiteCardModel from "../../shared/card-white";
import BoardModel from "../../shared/board";


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
          socket.broadcast.to(room!.id).emit("playerDisconnect", JSON.stringify(player));
        }
      }

    });
    
    socket.on('message', (message: string) => {
      console.log(`[RECV]: ${message}`)
    });

    socket.on('playWhite', (whiteCardMessage: string) => {
      console.log(`[Play white]: ${whiteCardMessage}`);

      const white: WhiteCardModel = JSON.parse(whiteCardMessage).white;

      // the room was switched ealier, thus the first and only element in this array is the current room
      const roomName: string = socket.rooms[0];

      const room: RoomModel | undefined = State.instance.rooms.get(roomName);

      room?.board?.whites.push(white);
      
      console.log("board: " + JSON.stringify(room));
      
    });
  
  }

}