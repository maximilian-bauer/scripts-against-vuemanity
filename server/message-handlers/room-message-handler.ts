import State from "../state/state";

import PlayerModel from "../../shared/player";
import ServerRoomModel from "../classes/server-room";
import RoomOptions from "../../shared/room-options";

import JoinRoomResponseType from "../../shared/join-room-response-type";
import CreateRoomResponseType from "../../shared/create-room-response-type";
import ServerPlayerModel from "../classes/server-player";
import GamePhase from "../../shared/game-phase";
import BlackCardModel from "../../shared/card-black";


export default class RoomMessageHandler {

  constructor(socket: SocketIO.Socket) {

    socket.on('joinRoomRequest', (joinRoomRequestString: string) => {
      console.log(`[Player]: ${joinRoomRequestString}`);

      const joinRoomRequest = JSON.parse(joinRoomRequestString);
      const player: ServerPlayerModel = new ServerPlayerModel(joinRoomRequest.nickname);

      const room = State.instance.rooms.get(joinRoomRequest.roomID);

      if (room !== undefined) {
        if (room.players.has(player.nickname)) {
          const existingPlayer = room.players.get(player.nickname);
          console.log("existingPlayer: " + existingPlayer?.nickname);
          if (existingPlayer !== undefined && !existingPlayer.connected) {
            existingPlayer.connected = true;

            // HACK: room.players is a Map which cannot be stringified. Even when transmitting without stringifiying, this does not work.
            // Thus send players separately as an Array.
            const response = { type: JoinRoomResponseType.ACCEPT, room: room, players: Array.from(room.players.entries()) as [string, PlayerModel][], hand: existingPlayer.hand };
            this.switchRoom(socket, joinRoomRequest.roomID);
            State.instance.socketPlayerMap.set(socket, { room: joinRoomRequest.roomID, nickname: joinRoomRequest.nickname });

            socket.emit("joinRoomResponse", JSON.stringify(response));
            //TODO: instead of sending playerJoin, send something like playerUpdate with an update type for clarity.
            socket.broadcast.to(room.id).emit("playerJoin", JSON.stringify(existingPlayer));
          } else {
            const response = { type: JoinRoomResponseType.DENY_PLAYER_ALREADY_CONNECTED, room: null, players: null };
            socket.emit("joinRoomResponse", JSON.stringify(response));
          }
        } else {
          State.instance.socketPlayerMap.set(socket, { room: joinRoomRequest.roomID, nickname: player.nickname });
          State.instance.rooms.get(joinRoomRequest.roomID)?.players.set(player.nickname, player);

          const response = { type: JoinRoomResponseType.ACCEPT, room: room, players: Array.from(room.players.entries()) as [string, PlayerModel][] };
          this.switchRoom(socket, joinRoomRequest.roomID);
          State.instance.socketPlayerMap.set(socket, { room: joinRoomRequest.roomID, nickname: joinRoomRequest.nickname });

          socket.emit("joinRoomResponse", JSON.stringify(response));
          socket.broadcast.to(room.id).emit("playerJoin", JSON.stringify(player));
        }
      } else {
        const response = { type: JoinRoomResponseType.DENY_ROOM_DOES_NOT_EXIST, room: null, players: null };
        socket.emit("joinRoomResponse", JSON.stringify(response));
      }
    });

    socket.on('createRoomRequest', (createRoomRequestString: string) => {
      console.log(`[Player]: ${createRoomRequestString}`)

      const createRoomRequest = JSON.parse(createRoomRequestString);
      const player: ServerPlayerModel = new ServerPlayerModel(createRoomRequest.nickname);

      console.log(`existing rooms: ${JSON.stringify(State.instance.rooms)}`)
      if (!State.instance.rooms.has(createRoomRequest.roomID)) {
        State.instance.socketPlayerMap.set(socket, { room: createRoomRequest.roomID, nickname: createRoomRequest.nickname });

        const room = new ServerRoomModel(createRoomRequest.roomID, player);
        State.instance.rooms.set(room.id, room);

        console.log("added new room");
        socket.emit("createRoomResponse", CreateRoomResponseType.ACCEPT);
        this.switchRoom(socket, createRoomRequest.roomID);
      } else {
        console.log(`Room ${createRoomRequest.roomID} already exists.`)
        socket.emit("createRoomResponse", CreateRoomResponseType.DENY_ROOM_ALREADY_EXISTS);
      }

    });

    socket.on('changeRoomOptions', (optionsMessageString: string) => {
      console.log(`[RoomOptions]: ${optionsMessageString}`);
      const optionsMessage: {
        roomID: string,
        options: RoomOptions
      } = JSON.parse(optionsMessageString);

      const roomName = optionsMessage.roomID;
      const room = State.instance.rooms.get(optionsMessage.roomID);

      if (room !== undefined) {
        room.options = optionsMessage.options;

        // disallow empty decks from being loaded
        if (optionsMessage.options.decks !== []) {
          console.log("room: " + JSON.stringify(room));
          room.loadDecks();
          
          // TODO: if editing room options during the game is implemented, a different phase needs to be added, so that no new black is dealt.
          if(room.phase == GamePhase.SELECTING_OPTIONS) {
            room.phase = GamePhase.PICKING;
            socket.server.in(roomName).emit('phaseChange', room.phase);
            
            room.board.black = room.deck?.blacks.pop();
            console.log("DEALING BLACK");
            socket.server.in(roomName).emit('dealBlack', JSON.stringify(room.board.black));
          }
        }
      }

      socket.broadcast.to(roomName).emit('roomOptions', optionsMessageString);

      console.log("Changed room options to " + optionsMessageString);
    });
  }

  /**
  * Make the socket leave all it's current rooms and join a new one.
  * @param {SocketIO.Socket} socket the socket whose room to switch
  * @param {string} newRoom the name of the room to join
  */
  switchRoom(socket: SocketIO.Socket, newRoomName: string) {

    console.log(`Switching room to ${newRoomName} for socket ${socket.id} of user ${State.instance.socketPlayerMap.get(socket)?.nickname}.`)

    const currentRooms = socket.server.sockets.adapter.sids[socket.id];
    for (let room in currentRooms) {
      socket.leave(room);
    }
    socket.join(newRoomName);

  }

}