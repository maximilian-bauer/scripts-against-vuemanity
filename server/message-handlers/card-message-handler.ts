import State from "../state/state";
import WhiteCardModel from "../../shared/card-white";

export default class CardMessageHandler {

  constructor(socket: SocketIO.Socket) {

    // TODO: This handler is only temporary. Once the server has the neccesary logic to handle the game flow, it can decide on it's own, when to deal cards.
    socket.on("drawWhites", () => {
      const { player, room } = State.instance.lookupPlayer(socket);

      if (player !== undefined && room !== undefined) {
        console.log(`Will deal ${room!.options!.handSize! - player.hand.length} whites.`)
        const drawnWhites: WhiteCardModel[] | undefined = room?.deck?.whites.splice(room?.deck?.whites.length - (room.options?.handSize! - player.hand.length));
        if (drawnWhites !== undefined) {
          player.hand.push(...drawnWhites);
          socket.emit("dealWhites", JSON.stringify(drawnWhites));
        }
      } else {
        console.log("Player or room undefined. Cannot deal whites as requested.");
      }

    });
  }
}