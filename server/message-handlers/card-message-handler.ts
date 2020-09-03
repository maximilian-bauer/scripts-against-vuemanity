import State from "../state/state";
import WhiteCardModel from "../../shared/card-white";
import ServerRoomModel from "../classes/server-room";
import ServerPlayerModel from "../classes/server-player";

export default class CardMessageHandler {

  constructor(socket: SocketIO.Socket) {

    // TODO: This handler is only temporary. Once the server has the neccesary logic to handle the game flow, it can decide on it's own, when to deal cards.
    socket.on("drawWhites", () => {
      const roomName: string = Object.values(socket.rooms)[0];
      const room: ServerRoomModel | undefined = State.instance.rooms.get(roomName);

      const nickname = State.instance.socketPlayerMap.get(socket)!.nickname;
      const player: ServerPlayerModel = room?.players.get(nickname)!;

      console.log(`Will deal ${room!.options!.handSize! - player.hand.length} whites.`)
      const drawnWhites: WhiteCardModel[] | undefined = room?.deck?.whites.splice(room?.deck?.whites.length - (room.options?.handSize! - player.hand.length));
      if(drawnWhites !== undefined) {
        player.hand.push(...drawnWhites);
        socket.emit("dealWhites", JSON.stringify(drawnWhites));
      }
    });
  }
}