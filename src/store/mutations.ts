import State from "./state";
import WhiteCardModel from "shared/card-white";
import RoomModel from "shared/room";
import PlayerModel from "shared/player";
import BlackCardModel from 'shared/card-black';
import GamePhase from 'shared/game-phase';

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

  SET_PLAYED(state: State, played: boolean) {
    state.played = played;
  },

  SET_CZAR(state: State, czar: boolean) {
    state.czar = czar;
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

  UPDATE_PHASE(state: State, phase: GamePhase) {
    state.room!.phase = phase;
  },

  PLAY_WHITE(state: State, white: WhiteCardModel) {
    state.room?.board.whites.push(white);
    state.hand.splice(state.hand.indexOf(white), 1);
  },

  REPLENISH_HAND(state: State, whites: WhiteCardModel[]) {
    state.hand.push(...whites);
  },

  UPDATE_BLACK(state: State, black: BlackCardModel){
    state.room!.board.black = black;
  },

  WHITE_PLAYED(state: State, white: WhiteCardModel) {
    state.room?.board.whites.push(white);
  }
};
