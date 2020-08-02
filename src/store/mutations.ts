import State from "./state";
import WhiteCardModel from "shared/card-white";
import RoomModel from "shared/room";
import PlayerModel from "shared/player";

export default {
  SET_NICKNAME(state: State, nickname: string) {
    state.nickname = nickname;
  },

  SET_SOCKET(state: State, socket: SocketIOClient.Socket) {
    state.socket = socket;
  },

  SET_CONNECTED(state: State, connected: boolean) {
    state.connected = connected;
  },

  SET_ROOM(state: State, room: RoomModel) {
    state.room = room;
  },

  SET_PLAYERS(state: State, players: Map<string, PlayerModel>) {
    state.room!.players = players;
  },

  ADD_PLAYER(state: State, player: PlayerModel) {
    state.room?.players.set(player.nickname, player);
  },

  UPDATE_PLAYER(state: State, player: PlayerModel) {
    state.room?.players.set(player.nickname, player);
  },

  PLAY_WHITE(state: State, white: WhiteCardModel) {
    state.room?.board.whites.push(white);
    state.hand.splice(state.hand.indexOf(white), 1);
  }
};
