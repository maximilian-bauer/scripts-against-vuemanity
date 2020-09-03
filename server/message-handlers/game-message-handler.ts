import State from "../state/state";

import WhiteCardModel from "../../shared/card-white";
import ServerRoomModel from "../classes/server-room";
import ServerPlayerModel from "../classes/server-player";

export default class GameMessageHandler {

  constructor(socket: SocketIO.Socket) {

    socket.on('playWhite', (whiteCardMessage: string) => {
      console.log(`[Play white]: ${whiteCardMessage}`);

      const white: WhiteCardModel = JSON.parse(whiteCardMessage).white;

      // the room was switched ealier, thus the first and only element in this array is the current room
      const roomName: string = State.instance.socketPlayerMap.get(socket)?.room!;
      const nickname = State.instance.socketPlayerMap.get(socket)?.nickname!;
      
      const room: ServerRoomModel | undefined = State.instance.rooms.get(roomName);
      const player: ServerPlayerModel = room?.players.get(nickname)!;

      room?.board?.whites.push(white);
      
      // Might find the "wrong" white card when there are whites with the same text. This should not maater though
      const playedCardIndex = player.hand.findIndex(w => w.text === white.text);
      // Remove the card from the players hand
      player.hand.splice(playedCardIndex, 1);
      
      console.log("board: " + JSON.stringify(room?.board));

      socket.broadcast.to(roomName).emit("whitePlayed", JSON.stringify(white));
      
    });
  
  }

}