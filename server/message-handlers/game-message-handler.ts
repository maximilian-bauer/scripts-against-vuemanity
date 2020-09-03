import State from "../state/state";

import WhiteCardModel from "../../shared/card-white";

export default class GameMessageHandler {

  constructor(socket: SocketIO.Socket) {

    socket.on('playWhite', (whiteCardMessage: string) => {
      console.log(`[Play white]: ${whiteCardMessage}`);

      const white: WhiteCardModel = JSON.parse(whiteCardMessage).white;

      const { player, room } = State.instance.lookupPlayer(socket);

      if (player !== undefined && room !== undefined) {
        room?.board?.whites.push(white);

        // Might find the "wrong" white card when there are whites with the same text. This should not matter though
        const playedCardIndex = player.hand.findIndex(w => w.text === white.text);
        // Remove the card from the players hand
        player.hand.splice(playedCardIndex, 1);

        console.log("board: " + JSON.stringify(room?.board));

        socket.broadcast.to(room.id).emit("whitePlayed", JSON.stringify(white));
      } else {
        console.log("Player or room undefined. Cannot play white as requested.")
      }

    });

  }

}